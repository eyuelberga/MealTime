"use client";
import { deleteByID } from "@/api/collections";
import { Button, DropdownMenu, IconButton } from "@radix-ui/themes";
import { EditIcon, EllipsisVerticalIcon, TrashIcon } from "@/components/icons";
import { useAsync } from "@/hooks/useAsync";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface CollectionActionsProps {
    id: string;
}

export default function CollectionActions({ id }: CollectionActionsProps) {
    const AxiosClientSide = useAxios();
    const router = useRouter();
    const onComplete = () => {
        window.location.assign("/collections");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    };
    const onRemove = async (id: string) => { await deleteByID(id, AxiosClientSide); };
    const { loading: deleteLoading, request: deleteRequest } = useAsync(onRemove, { onComplete, onError });
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <IconButton value="options" variant="soft" size="3">
                <EllipsisVerticalIcon />
            </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => { router.push(`/collections/${id}/edit`) }} >
                Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item color="red" onClick={() => { if (confirm("Are you sure you want to delete this collection?")) deleteRequest(id) }} >
                {deleteLoading ? "Loading..." : "Remove"}

            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
}