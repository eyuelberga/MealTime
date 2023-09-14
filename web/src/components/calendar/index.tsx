import { MealType } from "@/api/mealPlan";
import { RecipeResponse } from "@/api/recipes";
export interface MealPlanProps {
    id: string;
    recipe: RecipeResponse;
    mealType: MealType;
    date: Date;
}

export const getMealPlanKey = (y: number, m: number, d: number) => {
    const year = y;
    const month = (m + 1).toString();
    const day = (d).toString();
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export const mealTypeBgColor: Record<MealType, string> = {
    "BREAKFAST": "bg-sky-400",
    "BRUNCH": "bg-orange-400",
    "LUNCH": "bg-emerald-400",
    "DINNER": "bg-red-400",
    "SUPPER": "bg-stone-400",
    "OTHER": "bg-gray-400"

}
export * from "./MonthView";
export * from "./DayView";
export * from "./WeekView";