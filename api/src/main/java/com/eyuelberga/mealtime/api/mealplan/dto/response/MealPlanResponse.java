package com.eyuelberga.mealtime.api.mealplan.dto.response;

import com.eyuelberga.mealtime.api.mealplan.MealType;
import lombok.Data;

import java.util.Date;

@Data
public class MealPlanResponse {
    private String id;
    private String date;
    private MealType mealType;
    private Date createdAt;
    private Date updatedAt;
}
