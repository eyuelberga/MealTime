package com.eyuelberga.mealtime.api.recipe.dto.response;

import lombok.Data;

@Data
public class NutritionResponse {
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
