"use client"
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, CardHeader } from "@/components/card";
import { CollectionIcon, SearchIcon, CloseIcon } from "@/components/icons";
import { addToCollection } from "@/api/recipes";
import { CollectionResponse, getAll as getAllCollections } from '@/api/collections';
import { useAsync } from "@/hooks/useAsync";
import { ThrowError } from "@/components/throw-error";
import { Input } from "@/components/input";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { CollectionCard } from "@/components/collection";
import { ClientPagination as Pagination } from "@/components/pagination";
import { Button } from "@/components/button";
import { CollectionListPlaceholder } from "../../collections/loading";
import useAxios from "@/hooks/useAxios";
import { PaginatedResponse } from "@/api/response";

export interface AddToCollectionProps {
    recipeId: string;
    setShowModal: (show: boolean) => void
}

export default function AddToCollection({ recipeId, setShowModal }: AddToCollectionProps) {
    const [searchParams, setSearchParams] = useState<Record<string, string>>({});
    const AxiosClientSide = useAxios();
    const onSearch = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get("search")?.toString();
        const updatedSearchParams = { search: "" }
        if (search) {
            updatedSearchParams.search = search;
        }
        setSearchParams(updatedSearchParams)
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
        <Card className="mx-auto w-10/12 lg:w-8/12" isLoading={addToCollectionLoading} loadingMessage="Updating Recipe...">
            <CardHeader title="Select Collection">
                <Button variant="link" onClick={() => { setShowModal(false) }}><CloseIcon className="w-8 h-8" /></Button>
            </CardHeader>
            <CardHeader>
                <header className='w-full'>

                    <form onSubmit={onSearch}>
                        <Input defaultValue={searchParams.search || ""} name="search" placeholder='Search Collections...' leftInnerItem={<SearchIcon />} label="Hello" rightInnerItem={<button type="submit" className="text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 text-sm  px-4 py-2">Search</button>} />
                    </form>

                </header>
            </CardHeader>
            <CardBody>
                {getCollectionsLoading && <CollectionListPlaceholder />}
                {collectionsData && !getCollectionsLoading && <>
                    {collectionsData.totalItems < 1 && <EmptyPlaceholder {...getEmptyPlacholderProps()} />
                    }

                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 py-2 mb-4'>
                        {collectionsData.items.map(({ ...props }) => (<CollectionCard onClick={() => { addToCollectionRequest(recipeId, props.id) }} name={props.name} updatedAt={props.updatedAt} key={props.id} />))}
                    </div>
                    {collectionsData.totalItems > 0 && <Pagination size={collectionsData.size} currentItems={collectionsData.currentItems} searchParams={searchParams} setSearchParams={setSearchParams} totalItems={collectionsData.totalItems} currentPage={collectionsData.currentPage} totalPages={collectionsData.totalPages} />}
                </>}
            </CardBody>
        </Card>
    </>
    );
};
