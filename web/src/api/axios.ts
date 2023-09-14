import axios from "axios";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"
import {signIn } from 'next-auth/react';
import { isClient } from "@/helpers";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const AxiosServerSide = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

AxiosServerSide.interceptors.request.use(async function (config) {
    if (!isClient()) {
        const session = await getServerSession(authOptions)
        if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        return config;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


AxiosServerSide.interceptors.response.use(async function (response) {
    return response;
}, function (error) {
    if (error?.response?.status === 401) {
        signIn("keycloak");
    }
    if (error?.response?.status === 404) {
        redirect("/404");
    }
    return Promise.reject(error);
});

export const AxiosClientSide = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});