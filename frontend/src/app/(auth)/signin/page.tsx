"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "@/schema/login";
import Link from "next/link"
import React, { useEffect } from "react";
import { Logo } from "@/components/logo";
import { LoginDto } from "@/api/auth";
import { useAsync } from "@/hooks/useAsync";
import { Card } from "@/components/card";
import { getFormErrorMessage } from "@/helpers";
import { Button } from "@/components/button";
import { SignInResponse, signIn, signOut } from "next-auth/react";
import { LabelledInput } from "@/components/input";
export default function Page() {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
    });
    const onComplete = ({ ok, error }: SignInResponse) => {
        if (ok) {
            window.location.assign("/dashboard");
        }
        else {
            alert(error);
        }
    }
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const onSubmit = async (data: LoginDto) => {
        return await signIn("credentials", {
            ...data,
            redirect: false
        })
    };
    const { loading, request } = useAsync(onSubmit, { onError, onComplete });
    return (<>
        <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
            <Logo />
        </Link>
        <Card className="w-full sm:max-w-md" isLoading={loading}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form onSubmit={handleSubmit(request)} className="space-y-4 md:space-y-6">

                    <LabelledInput type="email" label="Email" placeholder="Email"  {...register("email")} errorText={getFormErrorMessage(errors.email)} />
                    <LabelledInput type="password" label="Password" placeholder="Password"  {...register("password")} errorText={getFormErrorMessage(errors.password)} />
                    <div className="flex items-center justify-between">

                        <a
                            href="#"
                            className="text-sm font-medium text-rose-600 hover:underline dark:text-rose-500"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Button
                        fullWidth
                        type="submit"
                    >
                        Sign in
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <Button
                            variant="link"
                            as={Link}
                            href="/signup"
                        >
                            Sign up
                        </Button>
                    </p>
                </form>

            </div>
        </Card>
    </>
    )
}