import { Card, CardBody, CardHeader } from "@/components/card";
import { formatTimestamp } from "@/helpers";
import { getByID, CollectionResponse } from "@/api/collections";
import RecipeList from "./RecipeList";
import CollectionActions from "./CollectionActions";
import { SearchForm } from "@/components/search-form/SearchForm";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Suspense } from "react";
import { RecipeListPlaceholder } from "../../recipes/loading";
import CollectionRecipeActions from "./CollectionRecipeActions";


async function Collection({ params, searchParams }: any) {
    const data: CollectionResponse = (await getByID(params.id)).data;
    return (
        <>
            <Card shadow="lg">
                <CardBody>
                    <div className="flex flex-wrap gap-4 justify-between mb-2" >
                        <h2 className="text-3xl font-bold lg:text-4xl">
                            {data.name}
                        </h2>
                        <CollectionActions id={data.id} />

                    </div>
                    <p className="text-gray-800">
                        {data.description}
                    </p>
                    <p className="text-gray-500">
                        Last Updated: {formatTimestamp(data.updatedAt)}
                    </p>
                </CardBody>
            </Card>
            <Card shadow="lg">
                <CardHeader title='Recipes' textSize='3xl' >
                    <header className='w-full'>
                        <div className="grid grid-cols-12 gap-4 align-baseline">
                            <div className='col-span-full xl:col-span-10 lg:col-span-8'>
                                <SearchForm />
                            </div>
                            <div className='col-span-full xl:col-span-2 lg:col-span-4'>
                                <CollectionRecipeActions collection={data} />
                            </div>
                        </div>
                    </header>
                </CardHeader>
                <CardBody>
                    <Suspense key={searchParams.search} fallback={<RecipeListPlaceholder />}>
                        <RecipeList collectionId={data.id} searchParams={searchParams} />
                    </Suspense>
                </CardBody>
            </Card>
        </>

    );
}

export default Collection;