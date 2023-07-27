package com.eyuelwoldemichael.mealtime.controllers;

import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeCollectionPaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginationOptions;
import com.eyuelwoldemichael.mealtime.dto.recipe.request.CreateRecipeRequest;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.request.UpdateRecipeRequest;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeImportResponse;
import com.eyuelwoldemichael.mealtime.services.RecipeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URISyntaxException;


/**
 * Controller to handle all operations on the Recipe resource
 *
 * @author Eyuel Woldemichael
 */
@RestController
@RequestMapping("/api/recipes")
@Slf4j
@RequiredArgsConstructor
@Validated
public class RecipeController {
    private final RecipeService recipeService;
    private final ObjectMapper objectMapper;

    @GetMapping("")
    public ResponseEntity<PaginatedResponse<RecipeResponse>> getAllRecipesPage(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {
        return new ResponseEntity<>(recipeService.getAll(new PaginationOptions(search, page, size, sort)), HttpStatus.OK);
    }

    @GetMapping("/import")
    public ResponseEntity<RecipeImportResponse> importFromUrl(
            @RequestParam() String url) throws URISyntaxException {
        return new ResponseEntity<>(recipeService.importFromUrl(url), HttpStatus.OK);

    }

    @GetMapping("/collection/{id}")
    public ResponseEntity<RecipeCollectionPaginatedResponse<RecipeResponse>> getAllRecipesOnCollectionPage(
            @PathVariable("id") String id,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {


        RecipeCollectionPaginatedResponse<RecipeResponse> response = recipeService.getAllInCollection(id, new PaginationOptions(search, page, size, sort));
        return new ResponseEntity<>(response, HttpStatus.OK);


    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable("id") String id) {
        RecipeResponse recipe = recipeService.get(id);
        if (recipe != null) {
            return new ResponseEntity<>(recipe, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<RecipeResponse> createRecipe(@RequestPart("recipe") String recipeStr, @RequestPart(required = false) MultipartFile image) throws JsonProcessingException {

        CreateRecipeRequest createRecipeRequestDto = objectMapper.readValue(recipeStr, CreateRecipeRequest.class);
        createRecipeRequestDto.setImage(image);
        return new ResponseEntity<>(recipeService.create(createRecipeRequestDto), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<RecipeResponse> updateRecipe(@PathVariable("id") String id, @RequestPart("recipe") String recipeStr, @RequestPart(required = false) MultipartFile image) throws JsonProcessingException {
        UpdateRecipeRequest updateRecipeRequestDto = objectMapper.readValue(recipeStr, UpdateRecipeRequest.class);
        updateRecipeRequestDto.setImage(image);
        updateRecipeRequestDto.setId(id);
        RecipeResponse response = recipeService.update(updateRecipeRequestDto);
        if (response == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-to-collection/{collectionId}")
    public ResponseEntity<RecipeResponse> addToCollection(@PathVariable("id") String id, @PathVariable("collectionId") String collectionId) {
        RecipeResponse response = recipeService.addToCollection(id, collectionId);
        if (response != null) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/remove-from-collection")
    public ResponseEntity<RecipeResponse> removeFromCollection(@PathVariable("id") String id) {
        RecipeResponse response = recipeService.removeCollection(id);
        if (response != null) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable("id") String id) {
        recipeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
