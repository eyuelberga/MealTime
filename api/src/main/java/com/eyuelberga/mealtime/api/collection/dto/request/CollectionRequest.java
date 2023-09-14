package com.eyuelberga.mealtime.api.collection.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CollectionRequest {
    @NotBlank
    private String name;
    private String description;

}
