package com.eyuelberga.mealtime.api.recipe.dto.response;

import com.eyuelberga.mealtime.api.collection.dto.response.CollectionResponse;
import com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanResponse;
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
