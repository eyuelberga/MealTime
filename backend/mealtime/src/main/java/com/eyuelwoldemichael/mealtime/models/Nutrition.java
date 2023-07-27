package com.eyuelwoldemichael.mealtime.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "nutrition")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Nutrition extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private Long calories;
    private Long totalFat;
    private Long saturatedFat;
    private Long cholesterol;
    private Long sodium;
    private Long carbohydrates;
    private Long fiber;
    private Long sugar;
    private Long protein;

}
