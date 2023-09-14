package com.eyuelberga.mealtime.api.collection;

import com.eyuelberga.mealtime.api.collection.dto.request.CollectionRequest;
import com.eyuelberga.mealtime.api.collection.dto.response.CollectionResponse;
import com.eyuelberga.mealtime.api.shared.PaginatedResponse;
import com.eyuelberga.mealtime.api.shared.PaginationOptions;
import com.eyuelberga.mealtime.api.shared.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


/**
 * Controller to handle all operations on the collection resource
 *
 * @author Eyuel Woldemichael
 */
@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
@Slf4j
@Validated
public class CollectionController {

    private final CollectionService collectionService;
    private final ModelMapper modelMapper;


    @GetMapping("")
    public ResponseEntity<PaginatedResponse<CollectionResponse>> getAllCollectionsPage(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {

        Page<Collection> collectionPage = collectionService.getAll(new PaginationOptions(search, page, size, sort));
        return new ResponseEntity<>(PaginationUtils.getPaginatedResponse(collectionPage, collection -> modelMapper.map(collection, CollectionResponse.class)), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionResponse> getCollectionById(@PathVariable("id") String id) {
        return new ResponseEntity<>(modelMapper.map(collectionService.get(id), CollectionResponse.class), HttpStatus.OK);

    }

    @PostMapping("")
    public ResponseEntity<CollectionResponse> createCollection(@RequestBody CollectionRequest collection) {
        Collection createdCollection = collectionService.create(modelMapper.map(collection, Collection.class));
        return new ResponseEntity<>(modelMapper.map(createdCollection, CollectionResponse.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionResponse> updateCollection(@PathVariable("id") String id, @RequestBody CollectionRequest collection) {
        Collection updateCollection = modelMapper.map(collection, Collection.class);
        updateCollection.setId(id);
        return new ResponseEntity<>(modelMapper.map(collectionService.update(updateCollection), CollectionResponse.class), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCollection(@PathVariable("id") String id) {
        collectionService.remove(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
