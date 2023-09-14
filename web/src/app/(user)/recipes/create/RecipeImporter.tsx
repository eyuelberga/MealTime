import { LinkIcon, } from "@/components/icons";
import { RecipeImportResponse, importFromUrl } from "@/api/recipes";
import { dataURLtoFile } from "@/helpers";
import { useState } from "react";
import { useAsync } from "@/hooks/useAsync";
import useAxios from "@/hooks/useAxios";
import { Input } from "@/components/input";
import { Button, TextField } from "@radix-ui/themes";

interface RecipeImporterProps {
    reset: any;
    onError: any
}

export default function RecipeImporter({ reset, onError }: RecipeImporterProps) {
    const AxiosClientSide = useAxios();
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

    const [recipeUrl, setRecipeUrl] = useState("");
    const onImportFromUrl = async () => {
        return await importFromUrl({ url: recipeUrl }, AxiosClientSide);

    };
    const onImportComplete = async (data: RecipeImportResponse) => {
        const dataUrl = await toDataUrl(data.image);
        const imageFile = dataURLtoFile(dataUrl);
        const get = (type: string | undefined) => {
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
    return <TextField.Root style={{ width: "100%" }} size="3">
     
        <TextField.Input value={recipeUrl} onChange={(e) => setRecipeUrl(e.target.value)} placeholder='Recipe website link' />
        <TextField.Slot>
            <Button disabled={!recipeUrl} onClick={onImportFromUrlClicked}>
                {importLoading ? "Loading..." : "Import"}
            </Button>
        </TextField.Slot>
    </TextField.Root>
}