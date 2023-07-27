package com.eyuelwoldemichael.mealtime.dto.mealplan.response;

import com.eyuelwoldemichael.mealtime.models.MealType;
import lombok.Data;

import java.util.Date;

@Data
public class MealPlanResponse {
    private String id;
    private Date date;
    private MealType mealType;
    private Date createdAt;
    private Date updatedAt;
}
