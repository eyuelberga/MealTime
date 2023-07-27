import { AxiosInstance } from "axios";
import { AxiosServerSide } from "./axios";
import { CollectionDto } from "./collections";
import { MealPlanResponse } from "./mealPlan";
export interface RecipeDto {
    id?: string,
    name?: string;
    image?: FileList;
    description?: string;
    servings?: number;
    prepTime?: number;
    cookTime?: number;
    ingredients?: string[];
    directions?: string[];
}
export interface RecipeResponse {
    id: string,
    name: string;
    image?: string;
    source?: string;
    description: string;
    servings: number;
    prepTime: number;
    cookTime: number;
    collection: CollectionDto | null;
    ingredientsCount?: number;
    ingredients: string[];
    directions: string[];
    nutrition?: {
        calories: number;
        totalFat: number;
        saturatedFat: number;
        cholesterol: number;
        sodium: number;
        carbohydrates: number;
        fiber: number;
        sugar: number;
        protein: number
    }
    meals?: MealPlanResponse[];
    updatedAt: string;
}

export interface GetAllByCollectionResponse {
    id: string;
    name: string;
    description?: string;
    items: RecipeResponse[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    currentItems: number;
    size: number;
    updatedAt: string;
}

export interface NutritionImportResponse {
    calories?: string;
    carbohydrateContent?: string;
    cholesterolContent?: string;
    fiberContent?: string;
    proteinContent?: string;
    saturatedFatContent?: string;
    sodiumContent?: string;
    sugarContent?: string;
    fatContent?: string;
    unsaturatedFatContent?: string;
}

export interface RecipeImportResponse {
    author: string;
    canonical_url: string;
    category: string;
    cook_time: number;
    cuisine: string;
    description: string;
    host: string;
    image: string;
    ingredients: string[];
    instructions: string;
    instructions_list: string[];
    language: string;
    nutrients?: NutritionImportResponse;
    prep_time: number;
    ratings: number;
    site_name: string;
    title: string;
    total_time: number;
    yields: string;
}


export async function getAll(q: any, base: AxiosInstance = AxiosServerSide) {
    const params = q || { page: 0, size: 10 };
    return await base.get("recipes", {
        params: {
            ...params
        }
    });
}



export async function importFromUrl(q: any, base: AxiosInstance = AxiosServerSide) {
    const params = q || { url: "" };
    return await base.get("recipes/import", {
        params: {
            ...params
        }
    });
}

export async function getAllByCollection(collectionId: string, q: any, base: AxiosInstance = AxiosServerSide) {
    const params = q || { page: 0, size: 10 };

    return await base.get(`recipes/collection/${collectionId}`, {
        params: {
            ...params
        }
    });
}

export async function getByID(id: string, base: AxiosInstance = AxiosServerSide) {
    return await base.get(`recipes/${id}`);
}

export async function create(recipe: RecipeDto, base: AxiosInstance = AxiosServerSide) {
    const form = new FormData();
    const { image, ...recipeVals } = recipe;
    form.append("recipe", JSON.stringify(recipeVals));
    if (image)
        form.append("image", image[0]);
    return await base.post("recipes", form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function update(id: string, recipe: RecipeDto, base: AxiosInstance = AxiosServerSide) {
    const form = new FormData();
    const { image, ...recipeVals } = recipe;
    form.append("recipe", JSON.stringify(recipeVals));
    if (image)
        form.append("image", image[0]);
    return await base.put(`recipes/${id}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function addToCollection(id: string, collectionId: string, base: AxiosInstance = AxiosServerSide) {
    return await base.put(`recipes/${id}/add-to-collection/${collectionId}`);
}

export async function removeFromCollection(id: string, base: AxiosInstance = AxiosServerSide) {
    return await base.put(`recipes/${id}/remove-from-collection`);
}

export async function deleteByID(id: string, base: AxiosInstance = AxiosServerSide) {
    return await base.delete(`recipes/${id}`);
}
