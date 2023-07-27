package com.eyuelwoldemichael.mealtime.services;

import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeCollectionPaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginationOptions;
import com.eyuelwoldemichael.mealtime.dto.recipe.request.CreateRecipeRequest;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.request.UpdateRecipeRequest;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeImportResponse;

import java.net.URISyntaxException;

public interface RecipeService {
    RecipeResponse create(CreateRecipeRequest recipe);
    RecipeResponse update(UpdateRecipeRequest recipe);
    RecipeResponse addToCollection(String recipeId, String collectionId);
    RecipeResponse removeCollection(String recipeId);
    void delete(String recipeId);
    RecipeResponse get(String recipeId);
    RecipeCollectionPaginatedResponse<RecipeResponse> getAllInCollection(String collectionId, PaginationOptions options);
    PaginatedResponse<RecipeResponse> getAll(PaginationOptions options);

    RecipeImportResponse importFromUrl(String url) throws URISyntaxException;
}
