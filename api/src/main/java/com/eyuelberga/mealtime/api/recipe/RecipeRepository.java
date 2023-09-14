package com.eyuelberga.mealtime.api.recipe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, String> {

  Page<Recipe> findByNameContainingIgnoreCaseAndCreatedBy(String name, String createdBy, Pageable pageable);

  Page<Recipe> findByCollection_IdAndCreatedBy(String id, String createdBy, Pageable pageable);

  Page<Recipe> findByCollection_Id_AndNameContainingIgnoreCaseAndCreatedBy(String id, String name, String createdBy, Pageable pageable);

  Optional<Recipe> findByIdAndCreatedBy(String id, String createdBy);
  Page<Recipe> findByCreatedBy(String createdBy,Pageable pageable);
}
