package com.eyuelberga.mealtime.api.collection;

import com.eyuelberga.mealtime.api.security.PrincipalUtils;
import com.eyuelberga.mealtime.api.shared.PaginationOptions;
import com.eyuelberga.mealtime.api.shared.PaginationUtils;
import com.eyuelberga.mealtime.api.shared.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService {
    private final CollectionRepository collectionRepository;

    @Override
    public Collection create(Collection collection) {
        return collectionRepository.save(collection);
    }

    @Override
    public Collection update(Collection collection) {
        Collection oldCollection = get(collection.getId());
        oldCollection.setName(collection.getName());
        oldCollection.setDescription(collection.getDescription());
        return collectionRepository.save(oldCollection);

    }

    @Override
    public void remove(String collectionId) {
        if (collectionRepository.existsById(collectionId)) {
            collectionRepository.deleteById(collectionId);
        } else {
            throw new ResourceNotFoundException("Could not find collection");
        }
    }

    @Override
    public Collection get(String collectionId) {
        Collection collection = collectionRepository.findByIdAndCreatedBy(collectionId, PrincipalUtils.getId()).orElse(null);
        if (collection != null) {
            return collection;
        } else {
            throw new ResourceNotFoundException("Could not find collection");
        }
    }

    @Override
    public Page<Collection> getAll(PaginationOptions options) {
        Pageable pagingSort = PaginationUtils.getPageable(options);
        String principalId = PrincipalUtils.getId();
        Page<Collection> page;
        if (options.getSearch() == null)
            page = collectionRepository.findByCreatedBy(principalId, pagingSort);
        else
            page = collectionRepository.findByNameContainingIgnoreCaseAndCreatedBy(options.getSearch(), principalId, pagingSort);

        return page;
    }
}
