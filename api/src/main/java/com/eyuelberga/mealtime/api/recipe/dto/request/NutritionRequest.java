package com.eyuelberga.mealtime.api.recipe.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NutritionRequest {
    @Min(0)
    private Long calories;
    @Min(0)
    private Long totalFat;
    @Min(0)
    private Long saturatedFat;
    @Min(0)
    private Long cholesterol;
    @Min(0)
    private Long sodium;
    @Min(0)
    private Long carbohydrates;
    @Min(0)
    private Long fiber;
    @Min(0)
    private Long sugar;
    @Min(0)
    private Long protein;
}
