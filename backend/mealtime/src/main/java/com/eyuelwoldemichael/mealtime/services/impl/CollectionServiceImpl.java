package com.eyuelwoldemichael.mealtime.services.impl;

import com.eyuelwoldemichael.mealtime.dto.pagination.PaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginationOptions;
import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.collection.request.CreateCollectionRequest;
import com.eyuelwoldemichael.mealtime.dto.collection.request.UpdateCollectionRequest;
import com.eyuelwoldemichael.mealtime.exceptions.ResourceNotFoundException;
import com.eyuelwoldemichael.mealtime.models.Collection;
import com.eyuelwoldemichael.mealtime.models.User;
import com.eyuelwoldemichael.mealtime.repositories.CollectionRepository;
import com.eyuelwoldemichael.mealtime.services.CollectionService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService {
    private final ModelMapper modelMapper;
    private final CollectionRepository collectionRepository;


    private Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }

    @Override
    public CollectionResponse create(CreateCollectionRequest createCollectionRequestDto) {
        Collection collection = modelMapper.map(createCollectionRequestDto, Collection.class);
        return modelMapper.map(collectionRepository.save(collection), CollectionResponse.class);
    }

    @Override
    public CollectionResponse update(UpdateCollectionRequest updateCollectionRequestDto) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection collection = collectionRepository.findByIdAndCreatedBy(updateCollectionRequestDto.getId(), currentUser.getId()).orElse(null);

        if (collection != null) {
            collection.setName(updateCollectionRequestDto.getName());
            collection.setDescription(updateCollectionRequestDto.getDescription());
            return modelMapper.map(collectionRepository.save(collection), CollectionResponse.class);
        } else {
            throw new ResourceNotFoundException("Could not find collection");
        }

    }

    @Override
    public void delete(String collectionId) {
        if (collectionRepository.existsById(collectionId)) {
            collectionRepository.deleteById(collectionId);
        } else {
            throw new ResourceNotFoundException("Could not find collection");
        }
    }

    @Override
    public CollectionResponse get(String collectionId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection collection = collectionRepository.findByIdAndCreatedBy(collectionId, currentUser.getId()).orElse(null);
        if (collection != null) {
            CollectionResponse response = modelMapper.map(collection, CollectionResponse.class);
            int recipeCount = collection.getRecipes().size();
            response.setRecipeCount(recipeCount);
            return response;

        } else {
            throw new ResourceNotFoundException("Could not find collection");
        }
    }

    @Override
    public PaginatedResponse<CollectionResponse> getAll(PaginationOptions options) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Sort.Order> orders = new ArrayList<>();
        if (options.getSort()[0].contains(",")) {
            // will sort more than 2 fields
            // sortOrder="field, direction"
            for (String sortOrder : options.getSort()) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            }
        } else {
            // sort=[field, direction]
            orders.add(new Sort.Order(getSortDirection(options.getSort()[1]), options.getSort()[0]));
        }
        Pageable pagingSort = PageRequest.of(options.getPage(), options.getSize(), Sort.by(orders));

        Page<Collection> pageTuts;
        if (options.getSearch() == null)
            pageTuts = collectionRepository.findByCreatedBy(currentUser.getId(), pagingSort);
        else
            pageTuts = collectionRepository.findByNameContainingAndCreatedBy(options.getSearch(), currentUser.getId(), pagingSort);

        List<CollectionResponse> collections = pageTuts.getContent().stream().map(collection -> {
            CollectionResponse res = modelMapper.map(collection, CollectionResponse.class);
            res.setRecipeCount(collection.getRecipes().size());
            return res;
        }).toList();
        PaginatedResponse<CollectionResponse> response = new PaginatedResponse<>();
        response.setItems(collections);
        response.setCurrentPage(pageTuts.getNumber());
        response.setTotalItems(pageTuts.getTotalElements());
        response.setTotalPages(pageTuts.getTotalPages());
        response.setCurrentItems(pageTuts.getNumberOfElements());
        response.setSize(pageTuts.getSize());

        return response;
    }
}
