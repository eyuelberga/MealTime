package com.eyuelwoldemichael.mealtime.controllers;

import com.eyuelwoldemichael.mealtime.dto.mealplan.request.CreateMealPlanRequest;
import com.eyuelwoldemichael.mealtime.dto.mealplan.request.UpdateMealPlanRequest;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanStatsResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanWithRecipeResponse;
import com.eyuelwoldemichael.mealtime.dto.mealplan.response.MealPlanAggregateResponse;
import com.eyuelwoldemichael.mealtime.models.MealType;
import com.eyuelwoldemichael.mealtime.services.MealPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.*;

/**
 * Controller to handle all operations on the MealPlan resource
 *
 * @author Eyuel Woldemichael
 */
@RestController
@RequestMapping("/api/meal-plans")
@RequiredArgsConstructor
@Validated
public class MealPlanController {

    private final MealPlanService mealPlanService;


    @GetMapping("/lookup")
    public ResponseEntity<List<MealPlanWithRecipeResponse>> getAllMealPlansInDateRange(
            @RequestParam() String start, @RequestParam() String end) {
        return new ResponseEntity<>(mealPlanService.getAllInRange(Date.valueOf(start), Date.valueOf(end)), HttpStatus.OK);
    }


    @GetMapping("/stats")
    public ResponseEntity<MealPlanStatsResponse> getMealPlanStats(
            @RequestParam() String start, @RequestParam() String end) {
        return new ResponseEntity<>(mealPlanService.getSumInRange(Date.valueOf(start), Date.valueOf(end)), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlanWithRecipeResponse> getMealPlanById(@PathVariable("id") String id) {
        MealPlanWithRecipeResponse response = mealPlanService.get(id);
        if (response != null) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<MealPlanWithRecipeResponse> createMealPlan(@RequestBody CreateMealPlanRequest mealPlan) {
        return new ResponseEntity<>(mealPlanService.create(mealPlan), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MealPlanWithRecipeResponse> updateMealPlan(@PathVariable("id") String id, @RequestBody UpdateMealPlanRequest mealPlan) {
        mealPlan.setId(id);
        return new ResponseEntity<>(mealPlanService.update(mealPlan), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMealPlan(@PathVariable("id") String id) {
        mealPlanService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
