"use client"
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody } from "@/components/card";
import { Button, Flex } from "@radix-ui/themes";
import { Section, SectionHeader, LabelledInput, LabelledSelect, LabelledInputContainer } from "@/components/sectioned-form";
import schema from "@/schema/mealPlan";
import { RecipeCard, RecipeCardProps } from "@/components/recipe";
import { getFormErrorMessage, imgUrl } from "@/helpers";
import { useAsync } from "@/hooks/useAsync";
import { update, MealPlanDto, getByID, MealPlanResponse } from "@/api/mealPlan";
import { } from "@/api/recipes";
import { MEAL_TYPES } from "@/constants";
import { useSearchParams } from "next/navigation";
import { OpenIcon, RecipeIcon, TrashIcon } from "@/components/icons";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import RecipeSelectorDialog from "../RecipeSelectorDialog";

export default function Create() {
    const AxiosClientSide = useAxios();
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams && searchParams.get("id");
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const onComplete = () => {
        window.location.assign("/meal-plan");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const onSubmit = async (data: MealPlanDto) => { if (id) await update(id, data, AxiosClientSide); };
    const { loading, request } = useAsync(onSubmit, { onComplete, onError });
    const { loading: getLoading, request: getRequestFunc } = useAsync<MealPlanResponse>(async (id: string) => await getByID(id, AxiosClientSide), {
        onComplete: (data) => {
            if (data.recipe) {
                setValue("recipe", data.recipe?.id);
                setRecipe(data.recipe);
            }
            setValue("date", format(new Date(data.date), "yyyy-MM-dd"));
            setValue("type", data.mealType);
        }, onError
    });
    const getRequest = useCallback(getRequestFunc, [id]);
    useEffect(() => {
        if (id) {
            getRequest(id);
        }
        else {
            router.replace("/404");
        }
    }, [getRequest, id, router])
    const [recipe, setRecipe] = useState<RecipeCardProps | null>(null);
    const onRecipeSelect = (recipe: any) => {
        setValue("recipe", recipe.id);
        setRecipe(recipe);
    }
    return (
        <>
            <Card isLoading={loading || getLoading} loadingMessage={loading ? "Updating Meal Plan..." : undefined}>
                <CardBody>
                    <form onSubmit={handleSubmit(request)}>
                        <Section>
                            <SectionHeader isTitle>Update Meal</SectionHeader>
                            <LabelledInput label="Date" type="date"  {...register("date")} errorText={getFormErrorMessage(errors.date)} />
                            <LabelledSelect label="Meal Type"  {...register("type")} errorText={getFormErrorMessage(errors.type)} >
                                <option value={undefined} selected disabled hidden>Select an Option</option>
                                {Object.values(MEAL_TYPES).map((value) => <option key={value} value={value}>{value}</option>)}
                            </LabelledSelect>
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
                                Update
                            </Button>
                        </Flex>
                    </form>
                </CardBody>
            </Card>
        </>
    );
};
