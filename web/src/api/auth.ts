import { AxiosInstance } from "axios";
import { AxiosServerSide } from "./axios";

export interface LoginDto {
    email?: string,
    password?: string;

}

export interface SignupDto extends LoginDto {
    name: string;
}
export interface AuthResponse {
    token: string,
    refreshToken: string;
    email: string;
    name: string;

}

export async function login(req: LoginDto, base: AxiosInstance = AxiosServerSide) {
    return await base.post("auth/signin", req);
}

export async function signup(req: SignupDto, base: AxiosInstance = AxiosServerSide) {
    return await base.post("auth/signup", req);
}