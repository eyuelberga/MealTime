package com.eyuelberga.mealtime.api.collection;

import com.eyuelberga.mealtime.api.shared.PaginationOptions;
import org.springframework.data.domain.Page;

public interface CollectionService {
    Collection create(Collection collection);

    Collection update(Collection collection);

    void remove(String collectionId);

    Collection get(String collectionId);

    Page<Collection> getAll(PaginationOptions options);
}
