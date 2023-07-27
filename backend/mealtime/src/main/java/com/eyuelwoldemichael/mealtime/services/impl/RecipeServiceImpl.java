package com.eyuelwoldemichael.mealtime.services.impl;

import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginationOptions;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.request.CreateRecipeRequest;
import com.eyuelwoldemichael.mealtime.dto.recipe.request.UpdateRecipeRequest;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.NutritionResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeCollectionPaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeImportResponse;
import com.eyuelwoldemichael.mealtime.dto.recipe.response.RecipeResponse;
import com.eyuelwoldemichael.mealtime.exceptions.ResourceNotFoundException;
import com.eyuelwoldemichael.mealtime.models.Collection;
import com.eyuelwoldemichael.mealtime.models.Recipe;
import com.eyuelwoldemichael.mealtime.models.User;
import com.eyuelwoldemichael.mealtime.repositories.CollectionRepository;
import com.eyuelwoldemichael.mealtime.repositories.MealPlanRepository;
import com.eyuelwoldemichael.mealtime.repositories.RecipeRepository;
import com.eyuelwoldemichael.mealtime.services.RecipeService;
import com.eyuelwoldemichael.mealtime.services.StorageService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
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
    private final ModelMapper modelMapper;
    private final StorageService storageService;

    @Value("${services.recipe-importer.endpoint}")
    private String recipeImporterEndpoint;

    @Value("${services.recipe-importer.secret}")
    private String recipeImporterSecret;

    private Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }

    @Override
    public RecipeResponse create(CreateRecipeRequest recipeRequest) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Recipe recipe = modelMapper.map(recipeRequest, Recipe.class);
        if (recipeRequest.getCollection() != null) {
            Optional<Collection> collection = collectionRepository.findByIdAndCreatedBy(recipeRequest.getCollection(), currentUser.getId());
            collection.ifPresent(recipe::setCollection);
        } else {
            recipe.setCollection(null);
        }
        String imageId = null;
        if (recipeRequest.getImage() != null) imageId = storageService.store(recipeRequest.getImage());
        recipe.setImage(imageId);
        return modelMapper.map(recipeRepository.save(recipe), RecipeResponse.class);
    }

    @Override
    public RecipeResponse update(UpdateRecipeRequest recipeRequest) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Recipe oldRecipe = recipeRepository.findByIdAndCreatedBy(recipeRequest.getId(), currentUser.getId()).orElse(null);
        if (oldRecipe != null) {
            Recipe recipe = modelMapper.map(recipeRequest, Recipe.class);
            if (recipeRequest.getCollection() == null) {
                recipe.setCollection(null);
            } else {
                Optional<Collection> collection = collectionRepository.findByIdAndCreatedBy(recipeRequest.getCollection(), currentUser.getId());
                collection.ifPresent(recipe::setCollection);
            }
            String imageId = oldRecipe.getImage();
            if (recipeRequest.getImage() != null) imageId = storageService.store(recipeRequest.getImage());
            recipe.setImage(imageId);
            recipe.setCreatedBy(oldRecipe.getCreatedBy());
            return modelMapper.map(recipeRepository.save(recipe), RecipeResponse.class);
        } else {
            throw new ResourceNotFoundException("Could not find recipe");
        }

    }

    @Override
    public RecipeResponse addToCollection(String recipeId, String collectionId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Recipe> recipeData = recipeRepository.findByIdAndCreatedBy(recipeId, currentUser.getId());
        if (recipeData.isPresent()) {
            Recipe recipe = recipeData.get();
            Optional<Collection> collection = collectionRepository.findByIdAndCreatedBy(collectionId, currentUser.getId());
            collection.ifPresent(recipe::setCollection);
            return modelMapper.map(recipeRepository.save(recipe), RecipeResponse.class);
        } else {
            throw new ResourceNotFoundException("Could not find recipe");
        }
    }

    @Override
    public RecipeResponse removeCollection(String recipeId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Recipe> recipeData = recipeRepository.findByIdAndCreatedBy(recipeId, currentUser.getId());
        if (recipeData.isPresent()) {
            Recipe recipe = recipeData.get();
            recipe.setCollection(null);
            return modelMapper.map(recipeRepository.save(recipe), RecipeResponse.class);
        } else {
            throw new ResourceNotFoundException("Could not find recipe");
        }
    }

    @Override
    public void delete(String recipeId) {

        if (recipeRepository.existsById(recipeId)) {
            recipeRepository.deleteById(recipeId);
        } else {
            throw new ResourceNotFoundException("Could not find recipe");
        }

    }

    @Override
    public RecipeResponse get(String recipeId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Recipe recipe = recipeRepository.findByIdAndCreatedBy(recipeId, currentUser.getId()).orElse(null);
        if (recipe != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DAY_OF_YEAR, -1);
            List<MealPlanResponse> scheduledMeals = mealPlanRepository.findAllByDateAfterAndRecipeIdAndCreatedBy(new Date(calendar.getTime().getTime()), recipeId, currentUser.getId()).stream().map(mealPlan -> modelMapper.map(mealPlan, MealPlanResponse.class)).toList();
            RecipeResponse response = modelMapper.map(recipe, RecipeResponse.class);
            response.setMeals(scheduledMeals);
            response.setNutrition(modelMapper.map(recipe.getNutrition(), NutritionResponse.class));
            return response;

        } else {
            throw new ResourceNotFoundException("Could not find recipe");
        }
    }

    @Override
    public RecipeCollectionPaginatedResponse<RecipeResponse> getAllInCollection(String collectionId, PaginationOptions options) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection collection = collectionRepository.findByIdAndCreatedBy(collectionId, currentUser.getId()).orElse(null);
        if (collection == null) {
            throw new ResourceNotFoundException("Could not find collection");
        }
        List<Sort.Order> orders = new ArrayList<>();

        if (options.getSort()[0].contains(",")) {
            // will sort more than 2 fields
            // sortOrder="field, direction"
            for (String sortOrder : options.getSort()) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            }
        } else {
            // sort=[field, direction]
            orders.add(new Sort.Order(getSortDirection(options.getSort()[1]), options.getSort()[0]));
        }


        Pageable pagingSort = PageRequest.of(options.getPage(), options.getSize(), Sort.by(orders));

        Page<Recipe> pageTuts;
        if (options.getSearch() == null)
            pageTuts = recipeRepository.findByCollection_IdAndCreatedBy(collectionId, currentUser.getId(), pagingSort);
        else
            pageTuts = recipeRepository.findByCollection_Id_AndNameContainingAndCreatedBy(collectionId, options.getSearch(), currentUser.getId(), pagingSort);

        List<RecipeResponse> recipes = pageTuts.getContent().stream().map(recipe -> modelMapper.map(recipe, RecipeResponse.class)).toList();
        RecipeCollectionPaginatedResponse<RecipeResponse> response = new RecipeCollectionPaginatedResponse<>();
        response.setId(collection.getId());
        response.setName(collection.getName());
        response.setDescription(collection.getDescription());
        response.setCreatedAt(collection.getCreatedAt());
        response.setUpdatedAt(collection.getUpdatedAt());
        response.setItems(recipes);
        response.setCurrentPage(pageTuts.getNumber());
        response.setTotalItems(pageTuts.getTotalElements());
        response.setTotalPages(pageTuts.getTotalPages());
        response.setCurrentItems(pageTuts.getNumberOfElements());
        response.setSize(pageTuts.getSize());
        return response;

    }

    @Override
    public PaginatedResponse<RecipeResponse> getAll(PaginationOptions options) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Sort.Order> orders = new ArrayList<>();
        if (options.getSort()[0].contains(",")) {
            // will sort more than 2 fields
            // sortOrder="field, direction"
            for (String sortOrder : options.getSort()) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            }
        } else {
            // sort=[field, direction]
            orders.add(new Sort.Order(getSortDirection(options.getSort()[1]), options.getSort()[0]));
        }
        Pageable pagingSort = PageRequest.of(options.getPage(), options.getSize(), Sort.by(orders));

        Page<Recipe> pageTuts;
        if (options.getSearch() == null)
            pageTuts = recipeRepository.findByCreatedBy(currentUser.getId(), pagingSort);
        else
            pageTuts = recipeRepository.findByNameContainingAndCreatedBy(options.getSearch(), currentUser.getId(), pagingSort);

        List<RecipeResponse> recipes = pageTuts.getContent().stream().map(recipe -> modelMapper.map(recipe, RecipeResponse.class)).toList();
        PaginatedResponse<RecipeResponse> response = new PaginatedResponse<>();
        response.setItems(recipes);
        response.setCurrentPage(pageTuts.getNumber());
        response.setTotalItems(pageTuts.getTotalElements());
        response.setTotalPages(pageTuts.getTotalPages());
        response.setCurrentItems(pageTuts.getNumberOfElements());
        response.setSize(pageTuts.getSize());

        return response;

    }

    @Override
    public RecipeImportResponse importFromUrl(String url) throws URISyntaxException {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("url", url);
        RecipeImportResponse response = WebClient.create().post()
                .uri(new URI(recipeImporterEndpoint))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(requestBody))
                .retrieve()
                .bodyToMono(RecipeImportResponse.class).share()
                .block();
        return response;
    }
}
