import React from 'react';
import { SearchIcon, CollectionIcon } from '@/components/icons';
import { Pagination } from '@/components/pagination';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { getAll } from '@/api/collections';
import { CollectionCard, CollectionCardProps } from '@/components/collection';
interface CollectionResponse extends CollectionCardProps {
    id: number;
}

export default async function CollectionList({ searchParams }: any) {
    const data: {
        items: CollectionResponse[],
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
    return (
        <>
            {data.totalItems < 1 && <EmptyPlaceholder {...getEmptyPlacholderProps()} />
            }

            <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 py-2 mb-4'>
                {data.items.map(({ ...props }) => (<CollectionCard key={props.id} {...props} href={`/collections/${props.id}`} />))}
            </div>

            {data.totalItems > 0 && <Pagination size={data.size} currentItems={data.currentItems} searchParams={searchParams} pathname='collections' totalItems={data.totalItems} currentPage={data.currentPage} totalPages={data.totalPages} />}
        </>
    );
}

