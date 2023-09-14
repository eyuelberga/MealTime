import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from "@radix-ui/themes";
import { Card, CardBody, CardHeader } from '@/components/card';
import CollectionList from './CollectionList';
import { CollectionListPlaceholder } from './loading';
import { SearchForm } from '@/components/search-form/SearchForm';

function Page({ searchParams }: any) {

  return (
    <Card shadow="lg">
      <CardHeader title='Collections' textSize='3xl' >
        <header className='w-full'>
          <div className="grid grid-cols-12 gap-4 align-baseline">
            <div className='col-span-full xl:col-span-10 lg:col-span-8'>
              <SearchForm />
            </div>
            <div className='col-span-full xl:col-span-2 lg:col-span-4'>

              <Button asChild size="3">
                <Link href="/collections/create">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  New Collection
                </Link>
              </Button>

            </div>
          </div>
        </header>
      </CardHeader>
      <CardBody>
        <Suspense key={searchParams.search} fallback={<CollectionListPlaceholder />}>
          <CollectionList searchParams={searchParams} />
        </Suspense>
      </CardBody>
    </Card>
  );
}

export default Page;
