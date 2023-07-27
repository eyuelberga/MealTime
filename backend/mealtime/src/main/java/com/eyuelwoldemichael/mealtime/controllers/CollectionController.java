package com.eyuelwoldemichael.mealtime.controllers;

import com.eyuelwoldemichael.mealtime.dto.pagination.PaginatedResponse;
import com.eyuelwoldemichael.mealtime.dto.pagination.PaginationOptions;
import com.eyuelwoldemichael.mealtime.dto.collection.response.CollectionResponse;
import com.eyuelwoldemichael.mealtime.dto.collection.request.CreateCollectionRequest;
import com.eyuelwoldemichael.mealtime.dto.collection.request.UpdateCollectionRequest;
import com.eyuelwoldemichael.mealtime.services.CollectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/collections")
@RequiredArgsConstructor
@Slf4j
@Validated
public class CollectionController {

    private final CollectionService collectionService;


    @GetMapping("")
    public ResponseEntity<PaginatedResponse<CollectionResponse>> getAllCollectionsPage(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {


        return new ResponseEntity<>(collectionService.getAll(new PaginationOptions(search, page, size, sort)), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionResponse> getCollectionById(@PathVariable("id") String id) {
        CollectionResponse collection = collectionService.get(id);
        if (collection != null) {
            return new ResponseEntity<>(collection, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping("")
    public ResponseEntity<CollectionResponse> createCollection(@RequestBody CreateCollectionRequest collection) {
        return new ResponseEntity<>(collectionService.create(collection), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionResponse> updateCollection(@PathVariable("id") String id, @RequestBody UpdateCollectionRequest collection) {
        collection.setId(id);
        CollectionResponse response = collectionService.update(collection);
        if (response == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCollection(@PathVariable("id") String id) {
        collectionService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
