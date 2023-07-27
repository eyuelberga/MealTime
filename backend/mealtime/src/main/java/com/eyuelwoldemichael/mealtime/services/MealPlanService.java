package com.eyuelwoldemichael.mealtime.services;

import com.eyuelwoldemichael.mealtime.dto.mealplan.request.CreateMealPlanRequest;
import com.eyuelwoldemichael.mealtime.dto.mealplan.request.UpdateMealPlanRequest;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanStatsResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanWithRecipeResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanAggregateResponse;
import com.eyuelwoldemichael.mealtime.models.MealType;

import java.sql.Date;
import java.util.List;

public interface MealPlanService {
    MealPlanWithRecipeResponse create(CreateMealPlanRequest mealPlan);

    MealPlanWithRecipeResponse update(UpdateMealPlanRequest mealPlan);

    void delete(String mealPlanId);

    MealPlanWithRecipeResponse get(String mealPlanId);

    List<MealPlanWithRecipeResponse> getAllInRange(Date start, Date end);

    MealPlanStatsResponse getSumInRange(Date start, Date end);
}
