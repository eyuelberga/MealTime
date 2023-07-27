"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody } from "@/components/card";
import { Button } from "@/components/button";
import { Section, SectionHeader, LabelledInput, LabelledTextarea } from "@/components/sectioned-form";
import schema from "@/schema/collection";
import { getFormErrorMessage } from "@/helpers";
import { getByID, CollectionDto, update } from "@/api/collections";
import { useAsync } from "@/hooks/useAsync";
import { ThrowError } from "@/components/throw-error";
import { useParams, useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";

export default function Edit() {
    const params = useParams();
    const router = useRouter();
    const AxiosClientSide = useAxios();
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: async () => (await getRequest())
    });
    const onComplete = () => {
        if (params && typeof params.id === "string")
            window.location.assign(`/collections/${params.id}`)
        else
            window.location.assign(`/collections`)
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const onSubmit = async (data: CollectionDto) => (params && typeof params.id === "string" && await update(params.id, data, AxiosClientSide));
    const { loading: updateLoading, request: updateRequest } = useAsync(onSubmit, { onComplete, onError });
    const { loading: getLoading, request: getRequest, error } = useAsync(async () => params && typeof params.id === "string" && await getByID(params.id, AxiosClientSide));
    const loading = getLoading || updateLoading;
    return (
        <>
            {error && <ThrowError error={error} />}
            <Card isLoading={loading} loadingMessage={getLoading ? "Fetching Collection..." : "Updating Collection..."}>
                <CardBody>
                    <form onSubmit={handleSubmit(updateRequest)}>
                        <Section>
                            <SectionHeader isTitle>Update Collection</SectionHeader>
                            <LabelledInput label="Collection Name"  {...register("name")} errorText={getFormErrorMessage(errors.name)} />
                            <LabelledTextarea label="Description" placeholder="Write a short description about the collection" {...register("description")} errorText={getFormErrorMessage(errors.description)} />
                        </Section>
                        <Button fullWidth type="submit">
                            Update Collection
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </>
    );
};
