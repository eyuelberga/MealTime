package com.eyuelberga.mealtime.api.mealplan.dto.response;

import com.eyuelberga.mealtime.api.recipe.dto.response.RecipeInfoResponse;
import lombok.Data;

@Data
public class MealPlanWithRecipeResponse extends MealPlanResponse {
    private RecipeInfoResponse recipe;
}
