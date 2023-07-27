import React, { Suspense } from 'react';
import Link from 'next/link';
import { Input } from "@/components/input";
import { SearchIcon } from '@/components/icons';
import { Button } from "@/components/button";
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
              <Button as={Link} fullWidth href="/collections/create">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Collection
              </Button>
            </div>
          </div>
        </header>
      </CardHeader>
      <CardBody>
        <Suspense key={searchParams.search} fallback={<CollectionListPlaceholder />}>
          {/* @ts-expect-error Server Component */}
          <CollectionList searchParams={searchParams} />
        </Suspense>
      </CardBody>
    </Card>
  );
}

export default Page;
