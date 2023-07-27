"use client"
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody } from "@/components/card";
import { Button } from "@/components/button";
import { Section, SectionHeader, LabelledInput, LabelledTextarea, LabelledInputContainer } from "@/components/sectioned-form";
import schema from "@/schema/recipe";
import { getFormErrorMessage, imgUrl } from "@/helpers";
import { PlusCircleIcon } from "@/components/icons";
import { getByID, RecipeDto, update } from "@/api/recipes";
import { useParams, useRouter } from "next/navigation";
import { useAsync } from "@/hooks/useAsync";
import { ThrowError } from "@/components/throw-error";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";

export default function Edit() {
    const params = useParams();
    const router = useRouter();
    const AxiosClientSide = useAxios();
    const mapRecipe = async () => {
        const req = await getRequest();
        const out = { ...req };
        if (req.collection && req.collection.id) {
            out["collection"] = req.collection.id;
        }
        out["image"] = [imgUrl(req.image)];
        return out;
    }
    const { watch, register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: mapRecipe
    });

    const image = watch("image");

    const toURL = (file: File | string) => {
        if (typeof file === "string") {
            return file;
        }
        return window.URL.createObjectURL(file);
    }

    const { fields: ingredientsField, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: "ingredients",
    });

    const { fields: directionsField, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: "directions",
    });
    const onComplete = () => {
        if (params && typeof params.id === "string")
            window.location.assign(`/recipes/${params.id}`);
        else
            window.location.assign("/recipes");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const onSubmit = async (data: RecipeDto) => (params && typeof params.id === "string" && await update(params.id, data, AxiosClientSide));
    const { loading: updateLoading, request: updateRequest } = useAsync(onSubmit, { onComplete, onError });
    const { loading: getLoading, request: getRequest, error } = useAsync(async () => params && typeof params.id === "string" && await getByID(params.id, AxiosClientSide));
    const loading = getLoading || updateLoading;
    return (<>
        {error && <ThrowError error={error} />}
        <Card isLoading={loading} loadingMessage={getLoading ? "Fetching Recipe..." : "Updating Recipe..."}>
            <CardBody>
                <form onSubmit={handleSubmit(updateRequest)}>
                    <Section>
                        <SectionHeader isTitle>Update Recipe</SectionHeader>
                        <LabelledInput label="Recipe Name"  {...register("name")} errorText={getFormErrorMessage(errors.name) || getFormErrorMessage(errors.collection)} />
                        <LabelledTextarea label="Description" placeholder="Write a short description about the recipe" {...register("description")} errorText={getFormErrorMessage(errors.description)} />

                        {image && image.length > 0 ? <LabelledInputContainer label="Image Preview">
                            <div className="relative w-36 h-36 mx-auto">
                                <Image fill src={toURL(image[0])} alt="Recipe Image" className="object-contain" />
                            </div>
                        </LabelledInputContainer> : ""}
                        <LabelledInput type="file" label="Image" helperText="Upload image files with max file size of 2 MB"  {...register("image")} errorText={getFormErrorMessage(errors.image)} />
                        <LabelledInput label="Source URL"  {...register("source")} errorText={getFormErrorMessage(errors.source) || getFormErrorMessage(errors.source)} />
                    </Section>
                    <Section>
                        <SectionHeader>Details</SectionHeader>
                        <LabelledInput label="Prep Time (mins)" type="number" {...register("prepTime")} errorText={getFormErrorMessage(errors.prepTime)} />
                        <LabelledInput label="Cook Time (mins)" type="number" {...register("cookTime")} errorText={getFormErrorMessage(errors.cookTime)} />
                        <LabelledInput label="Servings" type="number" {...register("servings")} errorText={getFormErrorMessage(errors.servings)} />
                    </Section>

                    <Section>
                        <SectionHeader>Ingredients</SectionHeader>
                        {errors.ingredients && errors.ingredients.message && <p className="col-span-12 text-sm text-red-600 mt-2">{errors.ingredients && typeof errors.ingredients.message === "string" ? errors.ingredients.message : "Please enter a valid value"}</p>}
                        {ingredientsField.map((field, index) => (
                            <LabelledInput key={field.id} label={`Ingredient ${index + 1}`} type="text" errorText={errors.ingredients instanceof Array ? getFormErrorMessage(errors.ingredients[index]) : getFormErrorMessage(errors.ingredients)} {...register(`ingredients.${index}` as const)} onRemove={() => { removeIngredient(index) }} />
                        ))}
                        <div className="col-start-4 col-span-8">
                            <Button variant="link" onClick={() => { appendIngredient("") }}><PlusCircleIcon /> Add Ingredient</Button>
                        </div>
                    </Section>

                    <Section>
                        <SectionHeader>Directions</SectionHeader>
                        {errors.directions && errors.directions.message && <p className="col-span-12 text-sm text-red-600 mt-2">{errors.directions && typeof errors.directions.message === "string" ? errors.directions.message : "Please enter a valid value"}</p>}
                        {directionsField.map((field, index) => (
                            <LabelledTextarea key={field.id} label={`Step ${index + 1}`} errorText={errors.directions instanceof Array ? getFormErrorMessage(errors.directions[index]) : getFormErrorMessage(errors.directions)} {...register(`directions.${index}` as const)} onRemove={() => { removeStep(index) }} />
                        ))}
                        <div className="col-start-4 col-span-8">
                            <Button variant="link" onClick={() => { appendStep("") }}><PlusCircleIcon /> Add Step</Button>
                        </div>
                    </Section>
                    <Section>
                        <SectionHeader>Nutrition (per serving)</SectionHeader>
                        <LabelledInput label="Calories (kcal)" type="number" {...register("nutrition.calories")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).calories)} />
                        <LabelledInput label="Total Fat (g)" type="number" {...register("nutrition.totalFat")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).totalFat)} />
                        <LabelledInput label="Saturated Fat (g)" type="number" {...register("nutrition.saturatedFat")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).saturatedFat)} />
                        <LabelledInput label="Cholesterol (mg)" type="number" {...register("nutrition.cholesterol")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).cholesterol)} />
                        <LabelledInput label="Sodium (mg)" type="number" {...register("nutrition.sodium")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).sodium)} />
                        <LabelledInput label="Carbohydrates (g)" type="number" {...register("nutrition.carbohydrates")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).carbohydrates)} />
                        <LabelledInput label="Fiber (g)" type="number" {...register("nutrition.fiber")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).fiber)} />
                        <LabelledInput label="Sugar (g)" type="number" {...register("nutrition.sugar")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).sugar)} />
                        <LabelledInput label="Protein (g)" type="number" {...register("nutrition.protein")} errorText={getFormErrorMessage(errors.nutrition && (errors.nutrition as any).protein)} />
                    </Section>

                    <Button fullWidth type="submit">
                        Update Recipe
                    </Button>
                </form>
            </CardBody>
        </Card>
    </>
    );
};
