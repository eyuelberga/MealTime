"use client";;
import { Badge, Flex, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@/components/icons";
import { RecipeResponse } from "@/api/recipes";
import { removeFromCollection } from '@/api/recipes';
import { useAsync } from "@/hooks/useAsync";
import CollectionSelectorDialog from "./CollectionSelectorDialog";
import useAxios from "@/hooks/useAxios";
export interface CollectionActionsProps {
    data: RecipeResponse;
}
export default function CollectionActions({ data }: CollectionActionsProps) {

    const onError = (errorMessage: string) => {
        alert(errorMessage);
    };
    const AxiosClientSide = useAxios();
    const onRemoveFromCollection = async (id: string) => { await removeFromCollection(id, AxiosClientSide); };
    const { request: removeFromCollectionRequest } = useAsync(onRemoveFromCollection, { onComplete: () => { window.location.reload() }, onError });

    return <Flex direction={{ initial: "column", md: "row" }} gap="2">
        {data.collection &&
            <Badge variant="outline">
                {data.collection.name}
                <IconButton value="remove" ml="2" variant="ghost" onClick={() => { removeFromCollectionRequest(data.id) }}>
                    <TrashIcon className="w-4 h-4" />
                </IconButton>
            </Badge>
        }
        <CollectionSelectorDialog recipeId={data.id} />
    </Flex>
}