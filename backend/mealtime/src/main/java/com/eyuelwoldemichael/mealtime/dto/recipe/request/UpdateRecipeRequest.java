package com.eyuelwoldemichael.mealtime.dto.recipe.request;

import lombok.Data;

@Data
public class UpdateRecipeRequest extends CreateRecipeRequest {
    private String id;
}
