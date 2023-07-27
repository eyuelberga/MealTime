package com.eyuelwoldemichael.mealtime.dto.recipe.response;

import com.eyuelwoldemichael.mealtime.dto.pagination.PaginatedResponse;
import lombok.Data;

import java.util.Date;

@Data
public class RecipeCollectionPaginatedResponse<T> extends PaginatedResponse<T> {
    private String id;
    private String name;
    private String description;
    private Date createdAt;
    private Date updatedAt;
}
