"use client"
import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/card";
import { SearchIcon, CloseIcon, PlusIcon, RecipeIcon, OpenIcon } from "@/components/icons";
import { RecipeResponse, getAll } from '@/api/recipes';
import { useAsync } from "@/hooks/useAsync";
import { ThrowError } from "@/components/throw-error";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { CollectionCard } from "@/components/collection";
import { ClientPagination as Pagination } from "@/components/pagination";
import { Button, Dialog, Flex, IconButton, Link, ScrollArea } from "@radix-ui/themes";
import useAxios from "@/hooks/useAxios";
import { PaginatedResponse } from "@/api/response";
import { SearchForm, SearchFormParams } from "@/components/search-form";
import { RecipeListPlaceholder } from "../loading";
import { Input } from "@/components/input";
import { RecipeCard } from "@/components/recipe";
import { imgUrl } from "@/helpers";

export interface RecipeSelectorDialogProps {
    children: ReactNode;
    onSelect: (props: any) => void;
}

export default function RecipeSelectorDialog({ children, onSelect }: RecipeSelectorDialogProps) {
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
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>

            <Dialog.Content className="min-w-[90%]">

                <Dialog.Title><Flex justify="between" align="center">
                    Select a Recipe
                    <Dialog.Close>
                        <IconButton value="close" variant="ghost"><CloseIcon /></IconButton>
                    </Dialog.Close>
                </Flex>
                </Dialog.Title>
                <SearchForm defaultValues={{}} callback={onSearch} />

                {error && <ThrowError error={error} />}


                {getRecipesLoading && <RecipeListPlaceholder />}
                {recipesData && !getRecipesLoading && <>
                    <ScrollArea scrollbars="vertical" style={{ height: 600 }}>
                        {recipesData.totalItems < 1 && <EmptyPlaceholder {...getEmptyPlacholderProps()} />
                        }
                        <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-2 mb-4'>
                            {recipesData.items.map(({ ...props }: any) => (<RecipeCard {...props} image={props.image ? imgUrl(props.image) : undefined} name={props.name} updatedAt={props.updatedAt} key={props.id}>

                                {onSelect && <Button variant="outline" onClick={() => { onSelect(props); }} ><PlusIcon />Select</Button>}

                                <Button variant="outline" asChild>
                                    <Link target="_blank" href={`/recipes/${props.id}`} >
                                        <OpenIcon /> Open
                                    </Link>
                                </Button>


                            </RecipeCard>))}
                        </div>
                    </ScrollArea>
                    {recipesData.totalItems > 0 && <Pagination size={recipesData.size} currentItems={recipesData.currentItems} searchParams={searchParams} setSearchParams={setSearchParams} totalItems={recipesData.totalItems} currentPage={recipesData.currentPage} totalPages={recipesData.totalPages} />}

                </>}


            </Dialog.Content>
        </Dialog.Root>
    </>
    );
};
