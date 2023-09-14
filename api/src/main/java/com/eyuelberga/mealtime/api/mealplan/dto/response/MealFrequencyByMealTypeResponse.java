package com.eyuelberga.mealtime.api.mealplan.dto.response;


import com.eyuelberga.mealtime.api.mealplan.MealType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MealFrequencyByMealTypeResponse {
    private Long count;
    private MealType mealType;
}
