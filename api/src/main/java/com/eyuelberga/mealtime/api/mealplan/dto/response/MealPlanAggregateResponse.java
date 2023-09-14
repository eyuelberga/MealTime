package com.eyuelberga.mealtime.api.mealplan.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class MealPlanAggregateResponse {
    private Long meals;
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
