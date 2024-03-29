package com.eyuelberga.mealtime.api.collection;

import com.eyuelberga.mealtime.api.collection.Collection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, String> {
  Page<Collection> findByNameContainingIgnoreCaseAndCreatedBy(String name, String createdBy, Pageable pageable);

  Optional<Collection> findByIdAndCreatedBy(String id, String createdBy);

  Page<Collection> findByCreatedBy(String createdBy,Pageable pageable);

}
