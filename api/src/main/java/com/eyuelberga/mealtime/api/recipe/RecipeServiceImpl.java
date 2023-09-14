package com.eyuelberga.mealtime.api.recipe;

import com.eyuelberga.mealtime.api.collection.Collection;
import com.eyuelberga.mealtime.api.collection.CollectionRepository;
import com.eyuelberga.mealtime.api.mealplan.MealPlan;
import com.eyuelberga.mealtime.api.mealplan.MealPlanRepository;
import com.eyuelberga.mealtime.api.security.PrincipalUtils;
import com.eyuelberga.mealtime.api.shared.PaginationOptions;
import com.eyuelberga.mealtime.api.shared.PaginationUtils;
import com.eyuelberga.mealtime.api.shared.exceptions.ResourceNotFoundException;
import com.eyuelberga.mealtime.api.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final CollectionRepository collectionRepository;
    private final MealPlanRepository mealPlanRepository;
    private final StorageService storageService;

    @Value("${services.recipe-importer.endpoint}")
    private String recipeImporterEndpoint;

    private Collection getCollection(String collectionId) {
        if (collectionId == null) return null;
        return collectionRepository.findByIdAndCreatedBy(collectionId, PrincipalUtils.getId()).orElse(null);
    }

    private String storeImage(MultipartFile file) {
        if (file == null) return null;
        return storageService.store(file);
    }

    @Override
    public Recipe create(Recipe recipe, String collectionId, MultipartFile image) {
        recipe.setCollection(getCollection(collectionId));
        recipe.setImage(storeImage(image));
        return create(recipe);
    }

    @Override
    public Recipe create(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe update(Recipe recipe) {
        String recipeId = recipe.getId();
        Recipe oldRecipe = get(recipeId);
        recipe.setCreatedBy(oldRecipe.getCreatedBy());
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe update(Recipe recipe, String collectionId, MultipartFile image) {
        recipe.setCollection(getCollection(collectionId));
        recipe.setImage(storeImage(image));
        return update(recipe);


    }

    @Override
    public Recipe addToCollection(String recipeId, String collectionId) {
        Recipe recipe = get(recipeId);
        recipe.setCollection(getCollection(collectionId));
        return recipeRepository.save(recipe);

    }

    @Override
    public Recipe removeFromCollection(String recipeId) {
        Recipe recipe = get(recipeId);
        recipe.setCollection(null);
        return recipeRepository.save(recipe);
    }

    @Override
    public void remove(String recipeId) {
        if (recipeRepository.existsById(recipeId)) {
            recipeRepository.deleteById(recipeId);
        } else {
            throw new ResourceNotFoundException("Could not find recipe");
        }

    }

    //TODO extract it out to meal plan service
    private List<MealPlan> getAllUpcomingMealsForRecipe(String recipeId) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        return mealPlanRepository.findAllByDateAfterAndRecipeIdAndCreatedBy(new Date(calendar.getTime().getTime()), recipeId, PrincipalUtils.getId()).stream().toList();
    }

    @Override
    public Recipe get(String recipeId) {
        Recipe recipe = recipeRepository.findByIdAndCreatedBy(recipeId, PrincipalUtils.getId()).orElse(null);
        if (recipe != null) {
            return recipe;
        } else {
            throw new ResourceNotFoundException("Could not find recipe");
        }
    }

    @Override
    public Page<Recipe> getAllInCollection(String collectionId, PaginationOptions options) {
        Pageable pagingSort = PaginationUtils.getPageable(options);
        String principalId = PrincipalUtils.getId();
        Page<Recipe> page;
        if (options.getSearch() == null)
            page = recipeRepository.findByCollection_IdAndCreatedBy(collectionId, principalId, pagingSort);
        else
            page = recipeRepository.findByCollection_Id_AndNameContainingIgnoreCaseAndCreatedBy(collectionId, options.getSearch(), principalId, pagingSort);
        return page;

    }

    @Override
    public Page<Recipe> getAll(PaginationOptions options) {
        Pageable pagingSort = PaginationUtils.getPageable(options);
        String principalId = PrincipalUtils.getId();
        Page<Recipe> page;
        if (options.getSearch() == null)
            page = recipeRepository.findByCreatedBy(principalId, pagingSort);
        else
            page = recipeRepository.findByNameContainingIgnoreCaseAndCreatedBy(options.getSearch(), principalId, pagingSort);


        return page;

    }

    @Override
    public RecipeImport importFromUrl(String url) {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("url", url);
        RecipeImport response = null;
        try {
            response = WebClient.create().post()
                    .uri(new URI(recipeImporterEndpoint))
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(requestBody))
                    .retrieve()
                    .bodyToMono(RecipeImport.class).share()
                    .block();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
        return response;
    }
}
