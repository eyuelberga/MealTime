package com.eyuelwoldemichael.mealtime.services;

import com.eyuelwoldemichael.mealtime.dto.pagination.PaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginationOptions;
import com.eyuelwoldemichael.mealtime.dto.collection.request.CreateCollectionRequest;
import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.collection.request.UpdateCollectionRequest;

public interface CollectionService {
    CollectionResponse create(CreateCollectionRequest collection);
    CollectionResponse update(UpdateCollectionRequest collection);
    void delete(String collectionId);
    CollectionResponse get(String collectionId);
    PaginatedResponse<CollectionResponse> getAll(PaginationOptions options);
}
