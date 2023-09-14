package com.eyuelberga.mealtime.api.mealplan;

import com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanStatsResponse;
import com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanWithRecipeResponse;

import java.sql.Date;
import java.util.List;

public interface MealPlanService {
    MealPlan create(MealPlan mealPlan);

    MealPlan create(MealPlan mealPlan, String recipeId);

    MealPlan update(MealPlan mealPlan);

    MealPlan update(MealPlan mealPlan, String recipeId);

    void remove(String mealPlanId);

    MealPlan get(String mealPlanId);

    List<MealPlan> getAllInRange(Date start, Date end);

    MealPlanStatsResponse getSumInRange(Date start, Date end);
}
