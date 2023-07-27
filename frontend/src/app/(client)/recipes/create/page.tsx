// @ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody } from "@/components/card";
import { Button } from "@/components/button";
import { Section, SectionHeader, LabelledInput, LabelledTextarea, LabelledInputContainer } from "@/components/sectioned-form";
import schema from "@/schema/recipe";
import { dataURLtoFile, getFormErrorMessage } from "@/helpers";
import { RecipeDto, create, RecipeImportResponse, importFromUrl } from "@/api/recipes";
import { LinkIcon, PlusCircleIcon } from "@/components/icons";
import { useAsync } from "@/hooks/useAsync";
import { useSearchParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { Input } from "@/components/input";

import Image from "next/image";

export default function Create() {
    const { register, handleSubmit, formState: { errors }, control, reset, watch, } = useForm({
        resolver: yupResolver(schema),
    });
    const { fields: ingredientsField, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: "ingredients",
    });

    const { fields: directionsField, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: "directions",
    });

    const AxiosClientSide = useAxios();

    const image = watch("image");

    useEffect(() => {
        appendIngredient("");
        appendStep("");
    }, [appendIngredient, appendStep]);
    const searchParams = useSearchParams();
    const collectionId = searchParams && searchParams.get("collectionId");
    const collectionName = searchParams && searchParams.get("collectionName");
    const addToCollection = collectionId && collectionName ? true : false;
    const onComplete = () => {
        window.location.assign(addToCollection ? `/collections/${collectionId}` : "/recipes");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const onSubmit = async (data: RecipeDto) => { await create(data, AxiosClientSide); };
    const { loading, request } = useAsync(onSubmit, { onComplete, onError });

    const [recipeUrl, setRecipeUrl] = useState("");
    const onImportFromUrl = async () => {
        return await importFromUrl({ url: recipeUrl }, AxiosClientSide);

    };

    const toDataUrl = async (url: string) => {
        const res = await fetch("/api/base64",
            {
                method: "POST",
                body: url,
            });
        return await res.text();

    };

    const toURL = (file: File) => {
        return window.URL.createObjectURL(file);
    }

    const onImportComplete = async (data: RecipeImportResponse) => {
        const dataUrl = await toDataUrl(data.image);
        const imageFile = dataURLtoFile(dataUrl);
        const get = (type: string) => {
            if (type) {
                return parseFloat(type.replace(/[^0-9]/g, ""));
            }
            return null
        }
        reset({
            name: data.title,
            source: data.canonical_url,
            image: [imageFile],
            description: data.description,
            servings: data.yields.includes("serving") ? parseInt(data.yields.replace(/[^0-9]/g, "")) : 1,
            prepTime: data.prep_time,
            cookTime: data.cook_time,
            ingredients: data.ingredients,
            directions: data.instructions_list,
            nutrition: {
                calories: get(data.nutrients?.calories),
                totalFat: get(data.nutrients?.fatContent),
                saturatedFat: get(data.nutrients?.saturatedFatContent),
                cholesterol: get(data.nutrients?.cholesterolContent),
                sodium: get(data.nutrients?.sodiumContent),
                carbohydrates: get(data.nutrients?.carbohydrateContent),
                fiber: get(data.nutrients?.fiberContent),
                sugar: get(data.nutrients?.sugarContent),
                protein: get(data.nutrients?.proteinContent),
            }
        });
    }

    const { loading: importLoading, request: onImportFromUrlClicked } = useAsync(onImportFromUrl, { onComplete: onImportComplete, onError });
    return (<Card isLoading={loading} loadingMessage="Creating Recipe...">
        <CardBody>
            <form onSubmit={handleSubmit(request)}>
                <Section>
                    <SectionHeader isTitle>
                        <div class="flex flex-wrap gap-2 items-center justify-between">
                            Create Recipe {addToCollection ? `on ${collectionName}` : ""}
                            <div className="w-full md:w-1/3">
                                <Input value={recipeUrl} onChange={(e) => setRecipeUrl(e.target.value)} bg name="search" placeholder='Recipe website link' leftInnerItem={<LinkIcon />} label="Hello" rightInnerItem={<Button isDisabled={!recipeUrl} isLoading={importLoading} onClick={onImportFromUrlClicked} size="sm" type="button">Import</Button>} />
                            </div>
                        </div>
                    </SectionHeader>
                    <LabelledInput label="Recipe Name"  {...register("name")} errorText={getFormErrorMessage(errors.name) || getFormErrorMessage(errors.collection)} />
                    {collectionId && <input defaultValue={collectionId} type="text" hidden {...register("collection")} />}
                    <LabelledTextarea label="Description" placeholder="Write a short description about the recipe" {...register("description")} errorText={getFormErrorMessage(errors.description)} />

                    {image && image.length > 0 ? <LabelledInputContainer label="Image Preview">
                        <div className="relative w-36 h-36 mx-auto">
                            <Image fill src={toURL(image[0])} alt="Recipe Image" className="object-contain" />
                        </div>
                    </LabelledInputContainer> : ""}

                    <LabelledInput type="file" label="Image" helperText="Upload image files with max file size of 2 MB" {...register("image")} errorText={getFormErrorMessage(errors.image)} />

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
                    <LabelledInput label="Calories (kcal)" type="number" {...register("nutrition.calories")} errorText={getFormErrorMessage(errors.nutrition?.calories)} />
                    <LabelledInput label="Total Fat (g)" type="number" {...register("nutrition.totalFat")} errorText={getFormErrorMessage(errors.nutrition?.totalFat)} />
                    <LabelledInput label="Saturated Fat (g)" type="number" {...register("nutrition.saturatedFat")} errorText={getFormErrorMessage(errors.nutrition?.saturatedFat)} />
                    <LabelledInput label="Cholesterol (mg)" type="number" {...register("nutrition.cholesterol")} errorText={getFormErrorMessage(errors.nutrition?.cholesterol)} />
                    <LabelledInput label="Sodium (mg)" type="number" {...register("nutrition.sodium")} errorText={getFormErrorMessage(errors.nutrition?.sodium)} />
                    <LabelledInput label="Carbohydrates (g)" type="number" {...register("nutrition.carbohydrates")} errorText={getFormErrorMessage(errors.nutrition?.carbohydrates)} />
                    <LabelledInput label="Fiber (g)" type="number" {...register("nutrition.fiber")} errorText={getFormErrorMessage(errors.nutrition?.fiber)} />
                    <LabelledInput label="Sugar (g)" type="number" {...register("nutrition.sugar")} errorText={getFormErrorMessage(errors.nutrition?.sugar)} />
                    <LabelledInput label="Protein (g)" type="number" {...register("nutrition.protein")} errorText={getFormErrorMessage(errors.nutrition?.protein)} />
                </Section>

                <Button fullWidth type="submit">
                    Create Recipe
                </Button>
            </form>
        </CardBody>
    </Card>
    );
};
