import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from "@/components/card";
import { Button } from '@/components/button';

export interface MealCardProps {
  href?: string;
  name: string;
  image?: string;
  shadow?: boolean;
  ingredients?: string[];
  cookTime?: number;
  prepTime?: number;
  bg?: string;
  updatedAt?: string;
  recipeHref?: string;
  replaceHref?: string;
  onRemove?: () => void;
  onClick?: () => void;
}

export function MealCard({ onClick, name, image, shadow, href, recipeHref, replaceHref, onRemove, bg, ingredients, cookTime = 0, prepTime = 0 }: MealCardProps) {

  const Content = (
    <div className={`border-b border-l border-r ${bg ? "" : "border-t"} flex flex-col bg-white`}>
      {bg && <div className={`${bg} rounded-t p-2`}>
      </div>}

      <div
        className="flex flex-col items-center justify-between  md:flex-row"
      >
        <Image src={image || "/images/placeholder.jpg"}
          width="500"
          height="500"
          className="object-cover w-full h-34  md:h-auto md:w-48"
          alt={name} />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h3 className="text-lg font-bold text-gray-800">
            {name}
          </h3>
          <p className=" text-xs text-gray-500">
            {ingredients?.length || 0} Ingredients,  Cook Time: {cookTime} mins, Prep time: {prepTime} mins
          </p>
        </div>
        {(recipeHref || replaceHref || onRemove) && <div className='px-2'>
          {recipeHref && <Button as={Link} href={recipeHref} variant='outline'>Go to Recipe</Button>}
          {replaceHref && <Button as={Link} href={replaceHref} variant='outline'>Replace</Button>}
          {onRemove && <Button onClick={onRemove} variant='outline'>Remove</Button>}
        </div>}
      </div>
    </div >);
  const C = <Card border={false} shadow={shadow ? 'lg' : undefined} hoverShadow={shadow ? '2xl' : undefined}>
    {href ?
      <Link href={href}>
        {Content}
      </Link>
      : Content}
  </Card>;
  return (
    onClick ? <div onClick={onClick}>{C}</div> : C
  );
}
