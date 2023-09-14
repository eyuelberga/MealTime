"use client";
import { deleteByID } from "@/api/collections";
import { Button, DropdownMenu, IconButton } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronLeftIcon, EditIcon, EllipsisVerticalIcon, TrashIcon } from "@/components/icons";
import { useAsync } from "@/hooks/useAsync";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface CollectionRecipeActionsProps {
    collection: any;
}

export default function CollectionRecipeActions({ collection }: CollectionRecipeActionsProps) {
    const router = useRouter();
    const createRecipeLink = (name: string, id: string) => `/recipes/create?collectionName=${name}&collectionId=${id}`;
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button value="options" variant="soft" size="3">
                Options <ChevronDownIcon className="w-4 h-4" />
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => { router.push(createRecipeLink(collection.name, collection.id)) }} >
                Create new recipe on collection
            </DropdownMenu.Item>
            {/* <DropdownMenu.Item onClick={() => { alert("Coming soon") }} >
                Add existing recipe to collection
            </DropdownMenu.Item> */}
        </DropdownMenu.Content>
    </DropdownMenu.Root>
}