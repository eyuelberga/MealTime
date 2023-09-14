import { AxiosServerSide } from "./axios";
import { format, lastDayOfMonth } from 'date-fns'
import { MEAL_TYPES } from "@/constants";
import { createLookup } from "@/helpers";
import { RecipeResponse } from "./recipes";
import { AxiosInstance } from "axios";
export type MealType = typeof MEAL_TYPES[keyof typeof MEAL_TYPES];
export interface MealPlanDto {
    date: string;
    type: MealType;
    recipe: string;
}

export interface Nutrition {
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


export interface NutritionByRecipe extends Nutrition {
    recipe: string;

}

export interface MealPlanResponse {
    id: string;
    date: string;
    mealType: MealType;
    recipe?: RecipeResponse
}


export interface MealPlanStatsResponse {
    total?: {
        meals: number;
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
    frequencyByMealType?: { mealType: string; count: number }[];
    frequencyByRecipe?: { recipe: string; count: number }[];
    nutritionSumByRecipe?: Record<string, any>;

}
export async function lookup(q: any, base: AxiosInstance = AxiosServerSide) {
    const today = new Date()
    const start = format(today, 'yyyy-MM-01')
    const end = format(lastDayOfMonth(today), 'yyyy-MM-dd')
    const params = q || { start, end };
    const res = await base.get("meal-plans/lookup", {
        params: {
            ...params
        }
    });
    const mapped = res.data.map(({ date, ...rest }: any) => ({ ...rest, date: format(new Date(date), 'yyyy-MM-dd') }));
    return { data: createLookup(mapped, "date") }
}


export async function getByID(id: string, base: AxiosInstance = AxiosServerSide) {
    return await base.get(`meal-plans/${id}`);
}


export async function stats(q: any, base: AxiosInstance = AxiosServerSide) {
    const today = new Date()
    const start = format(today, 'yyyy-MM-01')
    const end = format(lastDayOfMonth(today), 'yyyy-MM-dd')
    const params = q || { start, end };
    const res = await base.get("meal-plans/stats", {
        params: {
            ...params
        }
    });

    const data = res.data;

    return { data: { ...data } };
}

export async function create(mealPlan: MealPlanDto, base: AxiosInstance = AxiosServerSide) {
    return await base.post("meal-plans", mealPlan);
}

export async function update(id: string, mealPlan: MealPlanDto, base: AxiosInstance = AxiosServerSide) {
    return await base.put(`meal-plans/${id}`, mealPlan);
}

export async function deleteById(id: string, base: AxiosInstance = AxiosServerSide) {
    return await base.delete(`meal-plans/${id}`);
}