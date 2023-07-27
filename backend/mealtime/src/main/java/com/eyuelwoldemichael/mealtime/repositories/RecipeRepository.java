package com.eyuelwoldemichael.mealtime.repositories;

import com.eyuelwoldemichael.mealtime.models.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, String> {

  Page<Recipe> findByNameContainingAndCreatedBy(String name, String createdBy, Pageable pageable);

  Page<Recipe> findByCollection_IdAndCreatedBy(String id, String createdBy, Pageable pageable);

  Page<Recipe> findByCollection_Id_AndNameContainingAndCreatedBy(String id, String name, String createdBy, Pageable pageable);

  Optional<Recipe> findByIdAndCreatedBy(String id, String createdBy);
  Page<Recipe> findByCreatedBy(String createdBy,Pageable pageable);
}
