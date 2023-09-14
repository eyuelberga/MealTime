"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody } from "@/components/card";
import { Button, Flex } from "@radix-ui/themes";
import { Section, SectionHeader, LabelledInput, LabelledSelect, LabelledInputContainer } from "@/components/sectioned-form";
import schema from "@/schema/mealPlan";
import { RecipeCard, RecipeCardProps } from "@/components/recipe";
import { getFormErrorMessage, imgUrl } from "@/helpers";
import { useAsync } from "@/hooks/useAsync";
import { create, MealPlanDto } from "@/api/mealPlan";
import { getByID } from "@/api/recipes";
import { MEAL_TYPES } from "@/constants";
import { useSearchParams } from "next/navigation";
import { OpenIcon, RecipeIcon, TrashIcon } from "@/components/icons";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import RecipeSelectorDialog from "@/app/(user)/meal-plan/RecipeSelectorDialog";

export default function Create() {
    const AxiosClientSide = useAxios();
    const searchParams = useSearchParams();
    const defaultDate = searchParams && searchParams.get("date");
    const defaultType = searchParams && searchParams.get("type");
    const defaultRecipe = searchParams && searchParams.get("recipe");

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const onComplete = () => {
        window.location.assign("/meal-plan");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const onSubmit = async (data: MealPlanDto) => {
        await create(data, AxiosClientSide);
    };
    const { loading, request } = useAsync(onSubmit, { onComplete, onError });
    const { loading: fetchRecipeLoading, request: fetchRecipeRequestFunc } = useAsync(async (id: string) => await getByID(id, AxiosClientSide), {
        onComplete: (recipe) => {
            setValue("recipe", recipe.id); setRecipe(recipe);
        }, onError
    });
    const [recipe, setRecipe] = useState<RecipeCardProps | null>(null);
    const fetchRecipeRequest = useCallback(fetchRecipeRequestFunc, [defaultRecipe]);
    const onRecipeSelect = (recipe: any) => {
        setValue("recipe", recipe.id);
        setRecipe(recipe);
    }
    useEffect(() => {
        if (defaultRecipe) {
            fetchRecipeRequest(defaultRecipe);
        }
    }, [defaultRecipe])
    return (
        <>
            <Card isLoading={loading || fetchRecipeLoading} loadingMessage={loading ? "Adding to Meal Plan..." : undefined}>
                <CardBody>
                    <form onSubmit={handleSubmit(request)}>
                        <Section>
                            <SectionHeader isTitle>Add Meal</SectionHeader>
                            <LabelledInput defaultValue={defaultDate ? defaultDate : undefined} label="Date" type="date"  {...register("date")} errorText={getFormErrorMessage(errors.date)} />
                            <LabelledSelect defaultValue={defaultType ? defaultType : undefined} label="Meal Type"  {...register("type")} errorText={getFormErrorMessage(errors.type)} >
                                <option value={undefined} selected disabled hidden>Select an Option</option>
                                {Object.values(MEAL_TYPES).map((value) => <option key={value} value={value}>{value}</option>)}
                            </LabelledSelect>
                            {defaultType && <input hidden defaultValue={defaultType ? defaultType : undefined} {...register("type")} />}
                            <input hidden  {...register("recipe")} />
                            {recipe ? <LabelledInputContainer label="Recipe" errorText={getFormErrorMessage(errors.recipe)}>
                                <div className="w-full">
                                    {recipe && <RecipeCard horizontal {...recipe} image={recipe.image ? imgUrl(recipe.image) : undefined}>

                                        <Button variant="outline" asChild>
                                            <Link target="_blank" href={`/recipes/${recipe.id}`} >
                                                <OpenIcon /> Open
                                            </Link>
                                        </Button>

                                        <Button onClick={() => { setRecipe(null); setValue("recipe", ""); }} variant="outline"><TrashIcon /> Remove</Button>
                                    </RecipeCard>}
                                </div>
                            </LabelledInputContainer>
                                :
                                <LabelledInputContainer label="Recipe">
                                    <Flex direction="column" gap="2">
                                        <RecipeSelectorDialog onSelect={onRecipeSelect}>
                                            <Button variant="outline"> <RecipeIcon /> Select a Recipe</Button>
                                        </RecipeSelectorDialog>
                                        {getFormErrorMessage(errors.recipe) && <p className=" text-sm text-red-500">{getFormErrorMessage(errors.recipe)}</p>}
                                    </Flex>
                                </LabelledInputContainer>
                            }
                        </Section>
                        <Flex direction="row-reverse">
                            <Button type="submit">
                                Add to Plan
                            </Button>
                        </Flex>
                    </form>
                </CardBody>
            </Card>
        </>
    );
}
