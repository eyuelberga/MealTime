"use client"
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, CardHeader } from "@/components/card";
import { RecipeIcon, SearchIcon, CloseIcon, PlusIcon, OpenIcon } from "@/components/icons";
import { RecipeResponse, getAll } from '@/api/recipes';
import { useAsync } from "@/hooks/useAsync";
import { ThrowError } from "@/components/throw-error";
import { Input } from "@/components/input";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { RecipeCard } from "@/components/recipe";
import { ClientPagination as Pagination } from "@/components/pagination";
import { Button } from "@/components/button";
import { RecipeListPlaceholder } from "../recipes/loading";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { PaginatedResponse } from "@/api/response";
import { imgUrl } from "@/helpers";

export interface RecipeSelectorProps {
    onSelect: (id: any) => void;
    setShowModal: (show: boolean) => void
}

export default function RecipeSelector({ setShowModal, onSelect }: RecipeSelectorProps) {
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
                title: `No Recipe matching "${query}"`,
                subtitle: "Try searching another phrase"
            }
        }
        return {
            image: <RecipeIcon className={className} />,
            title: "You have not created any recipies yet!",
            subtitle: "Your recipes will show up here",
            href: "/recipes/create",
            cta: "Add Recipe"
        }

    }
    const { loading: getRecipesLoading, request: getRecipesRequestFunc, data: recipesData } = useAsync<PaginatedResponse<RecipeResponse>>((searchParams: Record<string, string>) => getAll(searchParams, AxiosClientSide), { onError: onFetchError });
    const getRecipesRequest = useCallback(getRecipesRequestFunc, [searchParams]);
    useEffect(() => {
        getRecipesRequest(searchParams)
    }, [searchParams])
    return (<>
        {error && <ThrowError error={error} />}
        <Card className="mx-auto w-11/12 sm:w-9/12">
            <CardHeader title="Select Recipe">
                <Button variant="link" onClick={() => { setShowModal(false) }}><CloseIcon className="w-8 h-8" /></Button>
            </CardHeader>
            <CardHeader>
                <header className='w-full'>

                    <form onSubmit={onSearch}>
                        <Input defaultValue={searchParams.search || ""} name="search" placeholder='Search Recipes...' leftInnerItem={<SearchIcon />} label="Hello" rightInnerItem={<button type="submit" className="text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 text-sm  px-4 py-2">Search</button>} />
                    </form>

                </header>
            </CardHeader>
            <CardBody>
                {getRecipesLoading && <RecipeListPlaceholder />}
                {recipesData && !getRecipesLoading && <>
                    {recipesData.totalItems < 1 && <EmptyPlaceholder {...getEmptyPlacholderProps()} />
                    }

                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   py-2 mb-4'>
                        {recipesData.items.map(({ ...props }: any) => (<RecipeCard {...props} image={props.image ? imgUrl(props.image) : undefined} name={props.name} updatedAt={props.updatedAt} key={props.id}>

                            <Button variant="outline" onClick={() => { onSelect(props); setShowModal(false); }} ><PlusIcon /> Add</Button>
                            <Button variant="outline" as={Link} target="_blank" href={`/recipes/${props.id}`} ><OpenIcon /> Open</Button>

                        </RecipeCard>))}
                    </div>
                    {recipesData.totalItems > 0 && <Pagination size={recipesData.size} currentItems={recipesData.currentItems} searchParams={searchParams} setSearchParams={setSearchParams} totalItems={recipesData.totalItems} currentPage={recipesData.currentPage} totalPages={recipesData.totalPages} />}
                </>}
            </CardBody>
        </Card>
    </>
    );
};
