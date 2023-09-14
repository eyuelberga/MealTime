package com.eyuelberga.mealtime.api.recipe.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RecipeImportResponse {
    private String author;
    @JsonProperty("canonical_url")
    private String canonicalUrl;
    private String category;
    @JsonProperty("cook_time")
    private int cookTime;
    private String cuisine;
    private String description;
    private String host;
    private String image;
    private String[] ingredients;
    private String instructions;
    @JsonProperty("instructions_list")
    private String[] instructionsList;
    private String language;
    private RecipeImportNutritionResponse nutrients;
    @JsonProperty("prep_time")
    private int prepTime;
    private int ratings;
    @JsonProperty("site_name")
    private String siteName;
    private String title;
    @JsonProperty("total_time")
    private int totalTime;
    private String yields;
}
