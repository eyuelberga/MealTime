import React from 'react';
import { RecipeCard, RecipeCardProps } from "@/components/recipe";
import { SearchIcon, RecipeIcon } from '@/components/icons';
import { Pagination } from '@/components/pagination';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { getAll } from '@/api/recipes';
import { imgUrl } from '@/helpers';
interface RecipeResponse extends RecipeCardProps {
}

async function RecipeList({ searchParams }: any) {
    const data: {
        items: RecipeResponse[],
        totalItems: number,
        totalPages: number,
        currentPage: number,
        currentItems: number,
        size: number
    } = (await getAll(searchParams)).data;
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
    return (
        <>
            {data.totalItems < 1 && <EmptyPlaceholder {...getEmptyPlacholderProps()} />
            }

            <div className='grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 py-2 mb-4'>
                {data.items.map(({ image, ...props }) => (<RecipeCard {...props} key={props.id} image={image ? imgUrl(image) : undefined} href={`/recipes/${props.id}`} />))}
            </div>
            {data.totalItems > 0 && <Pagination size={data.size} currentItems={data.currentItems} searchParams={searchParams} pathname='recipes' totalItems={data.totalItems} currentPage={data.currentPage} totalPages={data.totalPages} />}
        </>
    );
}

export default RecipeList;
