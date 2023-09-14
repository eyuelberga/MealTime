package com.eyuelberga.mealtime.api.recipe.dto.request;

import lombok.Data;

@Data
public class UpdateRecipeRequest extends CreateRecipeRequest {
    private String id;
}
