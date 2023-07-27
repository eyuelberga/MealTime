"use client";
import { AxiosClientSide } from "@/api/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxios = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = AxiosClientSide.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = AxiosClientSide.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        if (error?.response?.status === 401) {
          window.location.replace("/signin");
        }
        if (error?.response?.status === 404) {
          window.location.replace("/404");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      AxiosClientSide.interceptors.request.eject(requestIntercept);
      AxiosClientSide.interceptors.response.eject(responseIntercept);
    };
  },
    [session]
  );

  return AxiosClientSide;
};

export default useAxios;