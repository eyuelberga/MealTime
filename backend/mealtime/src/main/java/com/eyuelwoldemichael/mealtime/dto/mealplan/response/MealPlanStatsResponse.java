package com.eyuelwoldemichael.mealtime.dto.mealplan.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MealPlanStatsResponse {
    private MealPlanAggregateResponse total;
    private List<MealFrequencyByRecipeResponse> frequencyByRecipe;
    private List<MealFrequencyByMealTypeResponse> frequencyByMealType;
    private List<MealPlanAggregateByRecipeResponse> nutritionSumByRecipe;
}
