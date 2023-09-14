"use client";

import { AxiosServerSide } from "@/api/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await AxiosServerSide.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
    else signIn("keycloak");
  };
  return refreshToken;
};