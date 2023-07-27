package com.eyuelwoldemichael.mealtime.dto.recipe.response;

import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanResponse;
import com.eyuelwoldemichael.mealtime.models.Collection;
import lombok.Data;

import java.util.*;


@Data
public class RecipeResponse extends RecipeInfoResponse {
    private List<String> ingredients = new ArrayList<>();
    private List<String> directions = new ArrayList<>();
    private CollectionResponse collection;
    private List<MealPlanResponse> meals = new ArrayList<>();
    private NutritionResponse nutrition;


}
