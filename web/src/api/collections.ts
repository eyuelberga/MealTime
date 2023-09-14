import { AxiosInstance } from "axios";
import { AxiosServerSide } from "./axios";

export interface CollectionDto {
    id?: string,
    name?: string;
    description?: string;

}
export interface CollectionResponse {
    id: string,
    name: string;
    description: string;
    updatedAt: string;

}
export async function getAll(q: any, base: AxiosInstance = AxiosServerSide) {
    const params = q || { page: 0, size: 10 };

    return await base.get("collections", {
        params: {
            ...params
        }
    });
}

export async function getByID(id: string, base: AxiosInstance = AxiosServerSide) {
    return await base.get(`collections/${id}`);
}

export async function create(collection: CollectionDto, base: AxiosInstance = AxiosServerSide) {
    return await base.post("collections", collection);
}

export async function update(id: string, collection: CollectionDto, base: AxiosInstance = AxiosServerSide) {
    return await base.put(`collections/${id}`, collection);
}

export async function deleteByID(id: string, base: AxiosInstance = AxiosServerSide) {
    return await base.delete(`collections/${id}`);
}
