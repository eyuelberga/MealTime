package com.eyuelwoldemichael.mealtime.controllers;

import com.eyuelwoldemichael.mealtime.exceptions.storage.StorageFileNotFoundException;
import com.eyuelwoldemichael.mealtime.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


/**
 * Controller to handle file uploads and retrieval
 *
 * @author Eyuel Woldemichael
 */
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@Validated
public class FileUploadController {

    private final StorageService storageService;

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {

        storageService.store(file);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}