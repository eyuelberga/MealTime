package com.eyuelberga.mealtime.api.mealplan;

import com.eyuelberga.mealtime.api.mealplan.dto.request.MealPlanRequest;
import com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanStatsResponse;
import com.eyuelberga.mealtime.api.mealplan.dto.response.MealPlanWithRecipeResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
@RequestMapping("/meal-plans")
@RequiredArgsConstructor
@Validated
public class MealPlanController {

    private final MealPlanService mealPlanService;
    private final ModelMapper modelMapper;


    @GetMapping("/lookup")
    public ResponseEntity<List<MealPlanWithRecipeResponse>> getAllMealPlansInDateRange(
            @RequestParam() String start, @RequestParam() String end) {
        return new ResponseEntity<>(mealPlanService.getAllInRange(Date.valueOf(start), Date.valueOf(end)).stream()
                .map(mealPlan -> modelMapper.map(mealPlan, MealPlanWithRecipeResponse.class)).toList(), HttpStatus.OK);
    }


    @GetMapping("/stats")
    public ResponseEntity<MealPlanStatsResponse> getMealPlanStats(
            @RequestParam() String start, @RequestParam() String end) {
        return new ResponseEntity<>(mealPlanService.getSumInRange(Date.valueOf(start), Date.valueOf(end)), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlanWithRecipeResponse> getMealPlanById(@PathVariable("id") String id) {
        return new ResponseEntity<>(modelMapper.map(mealPlanService.get(id), MealPlanWithRecipeResponse.class), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<MealPlanWithRecipeResponse> createMealPlan(@RequestBody MealPlanRequest mealPlanRequest) {
        MealPlan mealPlan = modelMapper.map(mealPlanRequest, MealPlan.class);
        return new ResponseEntity<>(modelMapper.map(mealPlanService.create(mealPlan, mealPlanRequest.getRecipe()), MealPlanWithRecipeResponse.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MealPlanWithRecipeResponse> updateMealPlan(@PathVariable("id") String id, @RequestBody MealPlanRequest mealPlanRequest) {
        MealPlan mealPlan = modelMapper.map(mealPlanRequest, MealPlan.class);
        mealPlan.setId(id);
        return new ResponseEntity<>(modelMapper.map(mealPlanService.update(mealPlan, mealPlanRequest.getRecipe()), MealPlanWithRecipeResponse.class), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMealPlan(@PathVariable("id") String id) {
        mealPlanService.remove(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
