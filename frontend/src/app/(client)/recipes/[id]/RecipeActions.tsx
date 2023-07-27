"use client";
import React, { useState } from "react";
import { Button } from "@/components/button";
import { EditIcon, ShoppingIcon, CalendarIcon, TrashIcon, CollectionIcon } from "@/components/icons";
import { RecipeResponse } from "@/api/recipes";
import { deleteByID, removeFromCollection } from '@/api/recipes';
import { useAsync } from "@/hooks/useAsync";
import Link from "next/link";
import { Modal } from "@/components/modal";
import AddToCollection from "./AddToCollection";
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
        <Modal setShowModal={setShowModal} showModal={showModal}>
            <AddToCollection recipeId={data.id} setShowModal={setShowModal} />
        </Modal>
        <div className="flex flex-col md:inline-flex md:flex-row">
            <Button as={Link} variant="outline" href={`/recipes/${data.id}/edit`}>
                <EditIcon />
                Edit
            </Button>
            {/* <Button variant="outline">
                <CalendarIcon />
                Add To Plan
            </Button> */}
            <Button isLoading={removeFromCollectionLoading} variant="outline" onClick={() => { data.collection ? removeFromCollectionRequest(data.id) : onAddToCollection(data.id) }}>
                <CollectionIcon />
                {data.collection ? `Remove from ${data.collection.name}` : "Add To Collection"}
            </Button>
            {/* <Button variant="outline">
                <ShoppingIcon />
                Add To Shopping List
            </Button> */}

            <Button isLoading={deleteLoading} onClick={() => { if (confirm("Are you sure you want to delete this recipe?")) deleteRequest(data.id) }} variant="outline">
                <TrashIcon />
                Remove
            </Button>
        </div>
    </>
}