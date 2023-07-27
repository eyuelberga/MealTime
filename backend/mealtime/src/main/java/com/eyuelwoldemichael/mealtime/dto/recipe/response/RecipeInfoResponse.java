package com.eyuelwoldemichael.mealtime.dto.recipe.response;

import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanResponse;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


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
