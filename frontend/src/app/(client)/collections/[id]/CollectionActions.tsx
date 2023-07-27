"use client";
import { deleteByID } from "@/api/collections";
import { Button } from "@/components/button";
import { EditIcon, TrashIcon } from "@/components/icons";
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
    return <div className="flex flex-col md:inline-flex md:flex-row">
        <Button as={Link}
            href={`/collections/${id}/edit`}
            variant="outline"
        >
            <EditIcon />
            Edit
        </Button>
        <Button isLoading={deleteLoading} onClick={() => { if (confirm("Are you sure you want to delete this collection?")) deleteRequest(id) }} variant="outline">
            <TrashIcon />
            Remove
        </Button>
    </div>
}