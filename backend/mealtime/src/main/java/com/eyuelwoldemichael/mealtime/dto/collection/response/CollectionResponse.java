package com.eyuelwoldemichael.mealtime.dto.collection.response;

import lombok.Data;

import java.util.Date;

@Data
public class CollectionResponse {
    private String id;
    private String name;
    private String description;
    private int recipeCount;
    private Date createdAt;
    private Date updatedAt;
}
