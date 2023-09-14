package com.eyuelberga.mealtime.api.recipe;

import com.eyuelberga.mealtime.api.collection.CollectionService;
import com.eyuelberga.mealtime.api.recipe.dto.request.RecipeRequest;
import com.eyuelberga.mealtime.api.shared.PaginatedResponse;
import com.eyuelberga.mealtime.api.shared.PaginationOptions;
import com.eyuelberga.mealtime.api.recipe.dto.response.RecipeResponse;
import com.eyuelberga.mealtime.api.shared.PaginationUtils;
import com.eyuelberga.mealtime.api.storage.StorageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


/**
 * Controller to handle all operations on the Recipe resource
 *
 * @author Eyuel Woldemichael
 */
@RestController
@RequestMapping("/recipes")
@Slf4j
@RequiredArgsConstructor
@Validated
public class RecipeController {
    private final RecipeService recipeService;
    private final StorageService storageService;
    private final CollectionService collectionService;
    private final ObjectMapper objectMapper;
    private final ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<PaginatedResponse<RecipeResponse>> getAllRecipesPage(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {
        Page<Recipe> recipePage = recipeService.getAll(new PaginationOptions(search, page, size, sort));
        return new ResponseEntity<>(PaginationUtils.getPaginatedResponse(recipePage, recipe -> modelMapper.map(recipe, RecipeResponse.class)), HttpStatus.OK);
    }

    @GetMapping("/import")
    public ResponseEntity<RecipeImport> importFromUrl(
            @RequestParam() String url) {
        return new ResponseEntity<>(recipeService.importFromUrl(url), HttpStatus.OK);

    }

    @GetMapping("/collection/{id}")
    public ResponseEntity<PaginatedResponse<RecipeResponse>> getAllRecipesOnCollectionPage(
            @PathVariable("id") String id,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {

        Page<Recipe> recipePage = recipeService.getAllInCollection(id, new PaginationOptions(search, page, size, sort));
        return new ResponseEntity<>(PaginationUtils.getPaginatedResponse(recipePage, recipe -> modelMapper.map(recipe, RecipeResponse.class)), HttpStatus.OK);


    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable("id") String id) {
        return new ResponseEntity<>(modelMapper.map(recipeService.get(id), RecipeResponse.class), HttpStatus.OK);
    }

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<RecipeResponse> createRecipe(@RequestPart("recipe") String recipeStr, @RequestPart(required = false) MultipartFile image) throws JsonProcessingException {
        RecipeRequest recipeRequest = objectMapper.readValue(recipeStr, RecipeRequest.class);
        Recipe recipe = modelMapper.map(recipeRequest, Recipe.class);
        RecipeResponse response = modelMapper.map(recipeService.create(recipe, recipeRequest.getCollection(), image), RecipeResponse.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<RecipeResponse> updateRecipe(@PathVariable("id") String id, @RequestPart("recipe") String recipeStr, @RequestPart(required = false) MultipartFile image) throws JsonProcessingException {
        RecipeRequest recipeRequest = objectMapper.readValue(recipeStr, RecipeRequest.class);
        Recipe recipe = modelMapper.map(recipeRequest, Recipe.class);
        recipe.setId(id);
        RecipeResponse response = modelMapper.map(recipeService.update(recipe, recipeRequest.getCollection(), image), RecipeResponse.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-to-collection/{collectionId}")
    public ResponseEntity<RecipeResponse> addToCollection(@PathVariable("id") String id, @PathVariable("collectionId") String collectionId) {
        return new ResponseEntity<>(modelMapper.map(recipeService.addToCollection(id, collectionId), RecipeResponse.class), HttpStatus.OK);
    }

    @PutMapping("/{id}/remove-from-collection")
    public ResponseEntity<RecipeResponse> removeFromCollection(@PathVariable("id") String id) {
        return new ResponseEntity<>(modelMapper.map(recipeService.removeFromCollection(id), RecipeResponse.class), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable("id") String id) {
        recipeService.remove(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
