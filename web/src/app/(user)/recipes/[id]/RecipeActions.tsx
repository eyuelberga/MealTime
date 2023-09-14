"use client";
import React, { useState } from "react";
import { Button, DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { EditIcon, ShoppingIcon, CalendarIcon, TrashIcon, CollectionIcon, EllipsisVerticalIcon } from "@/components/icons";
import { RecipeResponse } from "@/api/recipes";
import { deleteByID, removeFromCollection } from '@/api/recipes';
import { useAsync } from "@/hooks/useAsync";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
export interface RecipeActionsProps {
    data: RecipeResponse;
}
export default function RecipeActions({ data }: RecipeActionsProps) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const onComplete = () => {
        window.location.assign("/recipes");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    };
    const AxiosClientSide = useAxios();
    const onRemove = async (id: string) => { await deleteByID(id, AxiosClientSide); };
    const onRemoveFromCollection = async (id: string) => { await removeFromCollection(id, AxiosClientSide); };
    const onAddToCollection = async (id: string) => { setShowModal(true); };
    const { loading: deleteLoading, request: deleteRequest } = useAsync(onRemove, { onComplete, onError });
    const { loading: removeFromCollectionLoading, request: removeFromCollectionRequest } = useAsync(onRemoveFromCollection, { onComplete: () => { window.location.reload() }, onError });

    return <>

        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <IconButton value="options" variant="outline" size="3">
                    <EllipsisVerticalIcon />
                </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item onClick={() => { router.push(`/recipes/${data.id}/edit`) }} >
                    Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item color="red" onClick={() => { if (confirm("Are you sure you want to delete this recipe?")) deleteRequest(data.id) }} >
                    {deleteLoading ? "Loading..." : "Remove"}

                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
        {/* <Flex direction={{ initial: "column", md: "row" }} gap="2">
            <Button variant="outline" onClick={() => { data.collection ? removeFromCollectionRequest(data.id) : onAddToCollection(data.id) }}>
                <CollectionIcon />
                {data.collection ? `Remove from ${data.collection.name}` : removeFromCollectionLoading ? "Loading..." : "Add To Collection"}
            </Button>
        </Flex> */}
    </>
}