package com.eyuelberga.mealtime.api.mealplan.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MealPlanRequest {
    @NotBlank
    private String date;
    @NotBlank
    private String type;
    @NotBlank
    private String recipe;
}
