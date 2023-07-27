package com.eyuelwoldemichael.mealtime.dto.mealplan.response;

import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeInfoResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeResponse;
import com.eyuelwoldemichael.mealtime.models.Recipe;
import lombok.Data;

@Data
public class MealPlanWithRecipeResponse extends MealPlanResponse {
    private RecipeInfoResponse recipe;
}
