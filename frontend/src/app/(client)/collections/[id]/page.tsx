import { Card, CardBody, CardHeader } from "@/components/card";
import { formatTimestamp } from "@/helpers";
import { getByID, CollectionResponse } from "@/api/collections";
import RecipeList from "./RecipeList";
import CollectionActions from "./CollectionActions";
import { SearchForm } from "@/components/search-form/SearchForm";
import { Button } from "@/components/button";
import Link from "next/link";
import { Suspense } from "react";
import { RecipeListPlaceholder } from "../../recipes/loading";


async function Collection({ params, searchParams }: any) {
    const data: CollectionResponse = (await getByID(params.id)).data;
    const createRecipeLink = (name: string, id: string) => `/recipes/create?collectionName=${name}&collectionId=${id}`;
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
                                {/* <form>
                <Input defaultValue={searchParams.search} name="search" placeholder='Search Recipies...' leftInnerItem={<SearchIcon />} label="Hello" rightInnerItem={<button type="submit" className="text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 text-sm  px-4 py-2">Search</button>} />
              </form> */}
                                <SearchForm />
                            </div>
                            <div className='col-span-full xl:col-span-2 lg:col-span-4'>
                                <Button as={Link} fullWidth href={createRecipeLink(data.name, data.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Create Recipe
                                </Button>
                            </div>
                        </div>
                    </header>
                </CardHeader>
                <CardBody>
                    <Suspense key={searchParams.search} fallback={<RecipeListPlaceholder />}>
                        {/* @ts-expect-error Server Component */}
                        <RecipeList collectionId={data.id} searchParams={searchParams} />
                    </Suspense>
                </CardBody>
            </Card>
        </>

    );
}

export default Collection;