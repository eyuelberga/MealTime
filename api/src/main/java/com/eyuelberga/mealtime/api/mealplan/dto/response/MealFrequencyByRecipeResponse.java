package com.eyuelberga.mealtime.api.mealplan.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MealFrequencyByRecipeResponse {
    private Long count;
    private String recipe;
}
