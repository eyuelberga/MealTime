import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from "@/components/card";

export interface MealCardWeekProps {
  href?: string;
  name: string;
  image?: string;
  shadow?: boolean;
  ingredients?: string[];
  cookTime?: number;
  prepTime?: number;
  bg?: string;
  updatedAt?: string;
}

export function MealCardWeek({ name, image, shadow, href, bg, ingredients, cookTime = 0, prepTime = 0 }: MealCardWeekProps) {

  const Content = (
    <div className="flex flex-col bg-white">
      <div className={`${bg || "bg-slate-100"} rounded-t p-2`}>
      </div>

      <div
        className="flex flex-col items-center"
      >
        <Image src={image || "/images/placeholder.jpg"}
          width="500"
          height="500"
          className="object-cover w-full h-24"
          alt={name} />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h3 className="text-lg font-bold text-gray-800">
            {name}
          </h3>
          <p className=" text-xs text-gray-500">
            {ingredients?.length || 0} Ingredients,  Cook Time: {cookTime} mins, Prep time: {prepTime} mins
          </p>
        </div>
      </div>
    </div>);
  return (
    <Card border={false} shadow={shadow ? 'lg' : undefined} hoverShadow={shadow ? '2xl' : undefined}>
      {href ?
        <Link href={href}>
          {Content}
        </Link>
        : Content}
    </Card>
  );
}
