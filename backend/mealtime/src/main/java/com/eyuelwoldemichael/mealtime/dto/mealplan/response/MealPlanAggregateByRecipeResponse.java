package com.eyuelwoldemichael.mealtime.dto.mealplan.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class MealPlanAggregateByRecipeResponse{
    private String recipe;
    private Long calories;
    private Long totalFat;
    private Long saturatedFat;
    private Long cholesterol;
    private Long sodium;
    private Long carbohydrates;
    private Long fiber;
    private Long sugar;
    private Long protein;
}
