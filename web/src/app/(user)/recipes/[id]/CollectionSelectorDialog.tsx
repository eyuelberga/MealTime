"use client"
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, CardHeader } from "@/components/card";
import { CollectionIcon, SearchIcon, CloseIcon, PlusIcon } from "@/components/icons";
import { addToCollection } from "@/api/recipes";
import { CollectionResponse, getAll as getAllCollections } from '@/api/collections';
import { useAsync } from "@/hooks/useAsync";
import { ThrowError } from "@/components/throw-error";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { CollectionCard } from "@/components/collection";
import { ClientPagination as Pagination } from "@/components/pagination";
import { Button, Dialog, Flex, IconButton, ScrollArea } from "@radix-ui/themes";
import useAxios from "@/hooks/useAxios";
import { PaginatedResponse } from "@/api/response";
import { SearchForm, SearchFormParams } from "@/components/search-form";

export interface CollectionSelectorDialogProps {
    recipeId: string;
}

export default function CollectionSelectorDialog({ recipeId }: CollectionSelectorDialogProps) {
    const [searchParams, setSearchParams] = useState<Record<string, string>>({});
    const AxiosClientSide = useAxios();
    const onSearch = (searchParams: SearchFormParams) => {
        setSearchParams(searchParams)
    };
    const onFetchError = (errorMessage: string) => {
        setError(errorMessage);
    };
    const [error, setError] = useState("");
    const getEmptyPlacholderProps = () => {
        const query = searchParams.search;
        const className = 'w-32 h-32 text-rose-200';
        if (query) {
            return {
                image: <SearchIcon className={className} />,
                title: `No Collection matching "${query}"`,
                subtitle: "Try searching another phrase"
            }
        }
        return {
            image: <CollectionIcon className={className} />,
            title: "You have not created any collections yet!",
            subtitle: "Your collections will show up here",
            href: "/collections/create",
            cta: "New Collection"
        }

    }
    const onAddToCollectionComplete = () => {
        window.location.reload();
    };
    const onError = (error: any) => {
        alert(error);
    }
    const { loading: getCollectionsLoading, request: getCollectionsRequestFunc, data: collectionsData } = useAsync<PaginatedResponse<CollectionResponse>>((searchParams: Record<string, string>) => getAllCollections(searchParams, AxiosClientSide), { onError: onFetchError });
    const { loading: addToCollectionLoading, request: addToCollectionRequest } = useAsync(async (id: any, collectionId: any) => addToCollection(id, collectionId, AxiosClientSide), { onComplete: onAddToCollectionComplete, onError });
    const getCollectionsRequest = useCallback(getCollectionsRequestFunc, [searchParams]);
    useEffect(() => {
        getCollectionsRequest(searchParams)
    }, [searchParams])
    return (<>
        {error && <ThrowError error={error} />}
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft"><PlusIcon /> Add To Collection</Button>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title><Flex justify="between" align="center">
                    Select a Collection
                    <Dialog.Close>
                        <IconButton value="close" variant="ghost"><CloseIcon /></IconButton>
                    </Dialog.Close>
                </Flex>
                </Dialog.Title>
                <SearchForm defaultValues={{}} callback={onSearch} />

                {collectionsData && !getCollectionsLoading && <>
                    <ScrollArea scrollbars="vertical" style={{ height: 600 }}>
                        {collectionsData.totalItems < 1 && <EmptyPlaceholder {...getEmptyPlacholderProps()} />
                        }

                        <div className='grid gap-2 grid-cols-1 py-2 mb-4'>
                            {collectionsData.items.map(({ ...props }) => (<CollectionCard onClick={() => { addToCollectionRequest(recipeId, props.id) }} name={props.name} updatedAt={props.updatedAt} key={props.id} />))}
                        </div>
                    </ScrollArea>
                    {collectionsData.totalItems > 0 && <Pagination size={collectionsData.size} currentItems={collectionsData.currentItems} searchParams={searchParams} setSearchParams={setSearchParams} totalItems={collectionsData.totalItems} currentPage={collectionsData.currentPage} totalPages={collectionsData.totalPages} />}
                </>}
            </Dialog.Content>
        </Dialog.Root>
    </>
    );
};
