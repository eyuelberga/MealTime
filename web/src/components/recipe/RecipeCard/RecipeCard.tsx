import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from "@/components/card";

export interface RecipeData {
  id?: string,
  name: string;
  description?: string;
  image?: string;
  cookTime?: number;
  prepTime?: number;
  updatedAt?: string;
}

export interface RecipeCardProps extends RecipeData {
  href?: string;
  bg?: string;
  shadow?: boolean;
  children?: ReactNode;
  horizontal?: boolean;
  compact?: boolean;
  border?: boolean;
}

export function RecipeCard({ border, compact, bg, updatedAt, name, image, description, shadow, href, cookTime = 0, prepTime = 0, children, horizontal }: RecipeCardProps) {

  const Content = (
    <div className={`flex ${horizontal ? "flex-row" : "flex-col group "} bg-white`}>
      {bg && <div className={`${bg} p-1`}>
      </div>}
      {!compact && <div className={horizontal ? "hidden md:block w-1/6 h-auto relative" : "relative pt-[50%] sm:pt-[40%] lg:pt-[60%] overflow-hidden"}>
        <Image src={image || "/images/placeholder.jpg"}
          fill
          className={`object-cover ${href && !horizontal ? "group-hover:scale-105 transition-transform duration-500 ease-in-out" : ""}`}
          alt={name} />
      </div>}
      <div className={`p-2 ${horizontal ? "w-5/6" : "w-full"}`}>
        <h3 className={`text-lg font-bold text-gray-800 ${compact ? "truncate" : ""}`}>
          {name}
        </h3>
        {!compact && description ? <p className="mb-1 font-normal text-gray-700 truncate max-w-full">{description}</p> : ""}
        <p className={`text-xs text-gray-500 ${compact ? "truncate" : ""}`}>
          Cook Time: {cookTime} mins, Prep time: {prepTime} mins
        </p>
        {updatedAt ? <p className={`text-xs text-gray-500 ${compact ? "truncate" : ""}`}>
          Last Updated: {new Date(updatedAt).toDateString()}
        </p> : ""}

        {children ? <div className="flex flex-col sm:flex-row mt-4 gap-2 md:mt-6">
          {children}
        </div> : ''}

      </div>
    </div>);
  return (
    <Card border={border} shadow={shadow ? 'lg' : undefined} hoverShadow={shadow ? '2xl' : undefined}>
      {href ?
        <Link href={href}>
          {Content}
        </Link>
        : Content}
    </Card>
  );
}
