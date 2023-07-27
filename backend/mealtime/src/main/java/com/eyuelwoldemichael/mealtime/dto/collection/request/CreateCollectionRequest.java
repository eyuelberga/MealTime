package com.eyuelwoldemichael.mealtime.dto.collection.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCollectionRequest {
    @NotBlank
    private String name;
    private String description;

}
