import { CloseIcon, ImportIcon } from "@/components/icons";
import { RecipeImportResponse, importFromUrl } from "@/api/recipes";
import { dataURLtoFile } from "@/helpers";
import { useState } from "react";
import { useAsync } from "@/hooks/useAsync";
import useAxios from "@/hooks/useAxios";
import { Button, Dialog, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import React from "react";

interface RecipeImporterDialogProps {
    onComplete: (data: any) => void;
    onError: any
}

export default function RecipeImporterDialog({ onError, onComplete }: RecipeImporterDialogProps) {
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
        onComplete({
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
        setOpen(false);
    }
    const [open, setOpen] = React.useState(false);
    const { loading: importLoading, request: onImportFromUrlClicked } = useAsync(onImportFromUrl, { onComplete: onImportComplete, onError });
    return <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
            <Button variant="soft"><ImportIcon /> Import Recipe</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title><Flex justify="between" align="center">
                Import Recipe
                <Dialog.Close>
                    <IconButton value="close" variant="ghost"><CloseIcon /></IconButton>
                </Dialog.Close>
            </Flex>
            </Dialog.Title>
            <Dialog.Description size="2" mb="4">
                You can import recipe from other sites by pasting in the url link
            </Dialog.Description>
            <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Recipe website link
                    </Text>
                    <TextField.Root>
                        <TextField.Input value={recipeUrl} onChange={(e) => setRecipeUrl(e.target.value)} />
                    </TextField.Root>
                </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
                <Button type="button" disabled={!recipeUrl} onClick={onImportFromUrlClicked}>
                    {importLoading ? "Loading..." : "Import"}
                </Button>

            </Flex>
        </Dialog.Content>
    </Dialog.Root>
}