import React from 'react';
import Link from 'next/link';
import { Card, CardBody } from "@/components/card";
import { formatTimestamp } from '@/helpers';

export interface CollectionCardProps {
  href?: string;
  name: string;
  recipeCount?: number;
  updatedAt: string;
  onClick?: () => void;
}

export function CollectionCard({ name, href, updatedAt, recipeCount = 0, onClick }: CollectionCardProps) {

  const Content = (
    <div className="group flex flex-col gap-2">
      <p className="font-bold text-xl">
        {name}
      </p>
      <p className="text-sm text-gray-500 truncate">
        {recipeCount} Recipes, Last Updated: {formatTimestamp(updatedAt)}
      </p>
    </div>);
  return (
    <div onClick={onClick}>
      <Card className='bg-white hover:bg-gray-50'>
        <CardBody>
          {href ?
            <Link href={href}>
              {Content}
            </Link>
            : Content}
        </CardBody>
      </Card>
    </div>
  );
}
