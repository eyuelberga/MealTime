package com.eyuelberga.mealtime.api.mealplan;

import com.eyuelberga.mealtime.api.mealplan.dto.response.MealFrequencyByRecipeResponse;
import com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanAggregateByRecipeResponse;
import com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanAggregateResponse;
import com.eyuelberga.mealtime.api.mealplan.dto.response.MealFrequencyByMealTypeResponse;
import com.eyuelberga.mealtime.api.mealplan.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
public interface MealPlanRepository extends JpaRepository<MealPlan, String> {
  List<MealPlan> findAllByDateBetweenAndCreatedBy(Date startDate, Date endDate, String createdBy);
  Optional<MealPlan> findByIdAndCreatedBy(String id, String createdBy);
  List<MealPlan> findAllByDateAfterAndRecipeIdAndCreatedBy(Date startDate,String recipeId, String createdBy);

  @Query("Select new com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanAggregateResponse(count(m.id), sum(m.recipe.nutrition.calories),sum(m.recipe.nutrition.totalFat),sum(m.recipe.nutrition.saturatedFat),sum(m.recipe.nutrition.cholesterol),sum(m.recipe.nutrition.sodium),sum(m.recipe.nutrition.carbohydrates),sum(m.recipe.nutrition.fiber),sum(m.recipe.nutrition.sugar),sum(m.recipe.nutrition.protein))  from MealPlan m where m.date between ?1 and ?2 and m.createdBy= ?3")
  MealPlanAggregateResponse nutritionSumDateBetweenAndCreatedBy(Date startDate, Date endDate, String createdBy);

  @Query("Select new com.eyuelberga.mealtime.api.mealplan.dto.response.MealFrequencyByMealTypeResponse(count(m.recipe.id), m.mealType) from MealPlan m where m.date between ?1 and ?2 and m.createdBy= ?3 GROUP BY m.mealType")
  List<MealFrequencyByMealTypeResponse> mealFrequencyByMealType(Date startDate, Date endDate, String createdBy);

  @Query("Select new com.eyuelberga.mealtime.api.mealplan.dto.response.MealFrequencyByRecipeResponse(count(m.recipe.id), m.recipe.name) from MealPlan m where m.date between ?1 and ?2 and m.createdBy= ?3 GROUP BY m.recipe.name")
  List<MealFrequencyByRecipeResponse> mealFrequencyByRecipe(Date startDate, Date endDate, String createdBy);


  @Query("Select new com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanAggregateByRecipeResponse(m.recipe.name, sum(m.recipe.nutrition.calories),sum(m.recipe.nutrition.totalFat),sum(m.recipe.nutrition.saturatedFat),sum(m.recipe.nutrition.cholesterol),sum(m.recipe.nutrition.sodium),sum(m.recipe.nutrition.carbohydrates),sum(m.recipe.nutrition.fiber),sum(m.recipe.nutrition.sugar),sum(m.recipe.nutrition.protein))  from MealPlan m where m.date between ?1 and ?2 and m.createdBy= ?3 GROUP BY m.recipe.name")
  List<MealPlanAggregateByRecipeResponse> sumByRecipe(Date startDate, Date endDate, String createdBy);






}
