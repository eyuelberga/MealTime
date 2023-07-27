"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/input";
import { SearchIcon } from "@/components/icons";
export function SearchForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const getQuery = () => {
        const query = searchParams?.get("search");
        if (query !== null) {
            return query
        }
        return undefined;
    }
    const onSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get("search");
        if (query) {
            router.replace(`${pathname}?search=${query}`);
        }
        else {
            router.replace(`${pathname}`);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Input defaultValue={getQuery()} name="search" placeholder='Search Recipies...' leftInnerItem={<SearchIcon />} label="Hello" rightInnerItem={<button type="submit" className="text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 text-sm  px-4 py-2">Search</button>} />
        </form>
    )
}