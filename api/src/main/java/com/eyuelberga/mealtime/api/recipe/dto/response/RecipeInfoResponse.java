package com.eyuelberga.mealtime.api.recipe.dto.response;

import lombok.Data;

import java.util.Date;


@Data
public class RecipeInfoResponse {
    private String id;
    private String name;
    private String image;
    private String description;
    private String source;
    private int servings;
    private int prepTime;
    private int cookTime;
    private Date createdAt;
    private Date updatedAt;


}
