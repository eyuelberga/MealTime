package com.eyuelberga.mealtime.api.recipe;

import com.eyuelberga.mealtime.api.shared.PaginationOptions;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RecipeService {

    Recipe create(Recipe recipe);

    Recipe create(Recipe recipe, String collectionId, MultipartFile image);

    Recipe update(Recipe recipe);

    Recipe update(Recipe recipe, String collectionId, MultipartFile image);

    Recipe addToCollection(String recipeId, String collectionId);

    Recipe removeFromCollection(String recipeId);

    void remove(String recipeId);

    Recipe get(String recipeId);

    Page<Recipe> getAllInCollection(String collectionId, PaginationOptions options);

    Page<Recipe> getAll(PaginationOptions options);

    RecipeImport importFromUrl(String url);
}
