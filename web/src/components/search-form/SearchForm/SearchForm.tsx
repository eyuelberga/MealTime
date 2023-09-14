"use client";
import React, { useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { Button, Select, TextField } from "@radix-ui/themes";

export type SearchFormParams = { search: string; sort: string; };

export interface SearchFormProps {
    callback?: (searchParams: SearchFormParams) => void;
    defaultValues?: { search?: string; sort?: string }
}



export function SearchForm({ callback, defaultValues }: SearchFormProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const formRef = useRef<HTMLFormElement>(null);

    const getValue = (name: "search" | "sort") => {
        if (defaultValues) return defaultValues[name];
        const param = searchParams?.get(name);
        if (param) {
            return param
        }
        return undefined;
    }

    const defaultCallback = (searchParams: SearchFormParams) => {
        const { search, sort } = searchParams;
        if (pathname) {
            const url = new URLSearchParams();
            if (search) url.set('search', search);
            if (sort) url.set('sort', sort);
            router.replace(`${pathname}?${url.toString()}`);
        }
        else {
            router.replace(`${pathname}`);
        }

    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get("search")?.toString();
        const sort = formData.get("sort")?.toString();
        const searchParams: SearchFormParams = {
            search: search || "",
            sort: sort || ""
        }
        if (callback) {
            callback(searchParams);
        }
        else {
            defaultCallback(searchParams);
        }
    }

    return (
        <form onSubmit={onSubmit} ref={formRef}>
            <TextField.Root size="3">
                <TextField.Slot>
                    <SearchIcon />
                </TextField.Slot>
                <TextField.Input defaultValue={getValue("search")} name="search" placeholder='Search...' />
                <TextField.Slot>
                    <Select.Root defaultValue={getValue("sort")} name="sort" onValueChange={() => { formRef.current?.requestSubmit(); }}>
                        <Select.Trigger placeholder="Sort by" color="gray" variant="soft" />
                        <Select.Content position="popper">
                            <Select.Item value="name,asc">Name: A to Z</Select.Item>
                            <Select.Item value="name,desc">Name: Z to A</Select.Item>
                            <Select.Item value="updatedAt,asc">Updated: earliest to latest</Select.Item>
                            <Select.Item value="updatedAt,desc">Updated: latest to earliest</Select.Item>

                        </Select.Content>
                    </Select.Root>
                </TextField.Slot>
                <TextField.Slot>
                    <Button variant="ghost" type="submit">Search</Button>
                </TextField.Slot>
            </TextField.Root>
        </form>
    )
}