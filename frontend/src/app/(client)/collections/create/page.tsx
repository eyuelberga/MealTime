"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody } from "@/components/card";
import { Button } from "@/components/button";
import { Section, SectionHeader, LabelledInput, LabelledTextarea } from "@/components/sectioned-form";
import schema from "@/schema/collection";
import { getFormErrorMessage } from "@/helpers";
import { useAsync } from "@/hooks/useAsync";
import { CollectionDto, create } from "@/api/collections";
import useAxios from "@/hooks/useAxios";

export default function Create() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onComplete = () => {
        window.location.assign("/collections");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const AxiosClientSide = useAxios();
    const onSubmit = async (data: CollectionDto) => { await create(data, AxiosClientSide); };
    const { loading, request } = useAsync(onSubmit, { onComplete, onError });
    return (<Card isLoading={loading} loadingMessage="Creating Collection...">
        <CardBody>
            <form onSubmit={handleSubmit(request)}>
                <Section>
                    <SectionHeader isTitle>Create Collection</SectionHeader>
                    <LabelledInput label="Collection Name"  {...register("name")} errorText={getFormErrorMessage(errors.name)} />
                    <LabelledTextarea label="Description" placeholder="Write a short description about the collection" {...register("description")} errorText={getFormErrorMessage(errors.description)} />
                </Section>
                <Button fullWidth type="submit">
                    Create Collection
                </Button>
            </form>
        </CardBody>
    </Card>
    );
};
