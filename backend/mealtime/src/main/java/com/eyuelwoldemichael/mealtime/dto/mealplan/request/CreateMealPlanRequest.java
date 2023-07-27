package com.eyuelwoldemichael.mealtime.dto.mealplan.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateMealPlanRequest {
    @NotBlank
    private String date;
    @NotBlank
    private String type;
    @NotBlank
    private String recipe;
}
