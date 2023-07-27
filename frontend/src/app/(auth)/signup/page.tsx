"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "@/schema/signup";
import Link from "next/link"
import React from "react";
import { Logo } from "@/components/logo";
import { signup, SignupDto, AuthResponse } from "@/api/auth";
import { useAsync } from "@/hooks/useAsync";
import { Card } from "@/components/card";
import { getFormErrorMessage } from "@/helpers";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { LabelledInput } from "@/components/input";

export default function Page() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
    });
    const onComplete = (data: AuthResponse) => {
        router.push("/signin");
    };
    const onError = (errorMessage: string) => {
        alert(errorMessage);
    }
    const onSubmit = async (data: SignupDto) => {
        return await signup(data);
    }
    const { loading, request } = useAsync(onSubmit, { onComplete, onError });
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
                    Create a new account
                </h1>
                <form onSubmit={handleSubmit(request)} className="space-y-4 md:space-y-6">
                    <LabelledInput type="text" label="Full Name" placeholder="Full Name"  {...register("name")} errorText={getFormErrorMessage(errors.name)} />
                    <LabelledInput type="email" label="Email" placeholder="Email"  {...register("email")} errorText={getFormErrorMessage(errors.email)} />
                    <LabelledInput type="password" label="Password" placeholder="Password"  {...register("password")} errorText={getFormErrorMessage(errors.password)} />
                    <LabelledInput type="password" label="Confirm Password" placeholder="Confirm Password"  {...register("confirmPassword")} errorText={getFormErrorMessage(errors.confirmPassword)} />

                    <Button
                        fullWidth
                        type="submit"
                    >
                        Sign up
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Button
                            variant="link"
                            as={Link}
                            href="/signin"
                        >
                            Sign in
                        </Button>
                    </p>
                </form>

            </div>
        </Card>
    </>
    )
}