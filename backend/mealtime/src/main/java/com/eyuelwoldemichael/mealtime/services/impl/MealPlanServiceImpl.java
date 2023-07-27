package com.eyuelwoldemichael.mealtime.services.impl;

import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.request.CreateMealPlanRequest;
import com.eyuelwoldemichael.mealtime.dto.mealplan.request.UpdateMealPlanRequest;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.*;
import com.eyuelwoldemichael.mealtime.exceptions.ResourceNotFoundException;
import com.eyuelwoldemichael.mealtime.models.Collection;
import com.eyuelwoldemichael.mealtime.models.MealPlan;
import com.eyuelwoldemichael.mealtime.models.MealType;
import com.eyuelwoldemichael.mealtime.models.User;
import com.eyuelwoldemichael.mealtime.repositories.MealPlanRepository;
import com.eyuelwoldemichael.mealtime.repositories.RecipeRepository;
import com.eyuelwoldemichael.mealtime.services.MealPlanService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MealPlanServiceImpl implements MealPlanService {

    private final ModelMapper modelMapper;
    private final MealPlanRepository mealPlanRepository;
    private final RecipeRepository recipeRepository;

    @Override
    public MealPlanWithRecipeResponse create(CreateMealPlanRequest createMealPlanRequestDto) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MealPlan mealPlan = new MealPlan();
        mealPlan.setDate(Date.valueOf(createMealPlanRequestDto.getDate()));
        mealPlan.setMealType(MealType.valueOf(createMealPlanRequestDto.getType()));
        mealPlan.setRecipe(recipeRepository.findByIdAndCreatedBy(createMealPlanRequestDto.getRecipe(), currentUser.getId()).orElseGet(null));
        return modelMapper.map(mealPlanRepository.save(mealPlan), MealPlanWithRecipeResponse.class);
    }

    @Override
    public MealPlanWithRecipeResponse update(UpdateMealPlanRequest mealPlanRequest) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MealPlan oldMealPlan = mealPlanRepository.findByIdAndCreatedBy(mealPlanRequest.getId(), currentUser.getId()).orElse(null);

        if (oldMealPlan != null) {
            oldMealPlan.setDate(Date.valueOf(mealPlanRequest.getDate()));
            oldMealPlan.setMealType(MealType.valueOf(mealPlanRequest.getType()));
            oldMealPlan.setRecipe(recipeRepository.findByIdAndCreatedBy(mealPlanRequest.getRecipe(), currentUser.getId()).orElseGet(null));
            return modelMapper.map(mealPlanRepository.save(oldMealPlan), MealPlanWithRecipeResponse.class);
        } else {
            throw new ResourceNotFoundException("Could not find meal plan");
        }
    }

    @Override
    public void delete(String mealPlanId) {
        if (mealPlanRepository.existsById(mealPlanId)) {
            mealPlanRepository.deleteById(mealPlanId);
        } else {
            throw new ResourceNotFoundException("Could not find meal plan");
        }


    }

    @Override
    public MealPlanWithRecipeResponse get(String mealPlanId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MealPlan mealPlan = mealPlanRepository.findByIdAndCreatedBy(mealPlanId, currentUser.getId()).orElse(null);
        if (mealPlan != null) {
            return modelMapper.map(mealPlan, MealPlanWithRecipeResponse.class);
        } else {
            throw new ResourceNotFoundException("Could not find meal plan");
        }
    }

    @Override
    public List<MealPlanWithRecipeResponse> getAllInRange(Date start, Date end) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return mealPlanRepository.findAllByDateBetweenAndCreatedBy(start, end, currentUser.getId()).stream().map(mealPlan -> modelMapper.map(mealPlan, MealPlanWithRecipeResponse.class)).toList();

    }

    @Override
    public MealPlanStatsResponse getSumInRange(Date start, Date end) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MealPlanAggregateResponse total = mealPlanRepository.nutritionSumDateBetweenAndCreatedBy(start, end, currentUser.getId());

        List<MealFrequencyByMealTypeResponse> mealFrequencyByMealType = mealPlanRepository.mealFrequencyByMealType(start, end, currentUser.getId());
        List<MealFrequencyByRecipeResponse> mealFrequencyByRecipeResponses = mealPlanRepository.mealFrequencyByRecipe(start, end, currentUser.getId());
        List<MealPlanAggregateByRecipeResponse> nutritionSumByRecipe = mealPlanRepository.sumByRecipe(start, end, currentUser.getId());
        return MealPlanStatsResponse.builder()
                .total(total)
                .frequencyByMealType(mealFrequencyByMealType)
                .frequencyByRecipe(mealFrequencyByRecipeResponses)
                .nutritionSumByRecipe(nutritionSumByRecipe)
                .build();

    }
}
