package com.eyuelwoldemichael.mealtime.dto.mealplan.response;


import com.eyuelwoldemichael.mealtime.models.MealType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MealFrequencyByRecipeResponse {
    private Long count;
    private String recipe;
}
