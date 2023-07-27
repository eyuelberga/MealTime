package com.eyuelwoldemichael.mealtime.dto.recipe.request;

import com.eyuelwoldemichael.mealtime.dto.recipe.response.NutritionResponse;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class CreateRecipeRequest {
    @NotBlank
    private String name;
    private String description;
    private String source;
    private MultipartFile image;
    @NotBlank
    private int servings;
    @NotBlank
    private int prepTime;
    @NotBlank
    private int cookTime;
    private List<String> ingredients = new ArrayList<>();
    private List<String> directions = new ArrayList<>();
    private String collection;
    private NutritionRequest nutrition;
}
