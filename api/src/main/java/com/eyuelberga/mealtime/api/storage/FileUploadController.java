package com.eyuelberga.mealtime.api.storage;

import com.eyuelberga.mealtime.api.storage.exceptions.StorageFileNotFoundException;
import com.eyuelberga.mealtime.api.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;


/**
 * Controller to handle file uploads and retrieval
 *
 * @author Eyuel Woldemichael
 */
@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
@Validated
public class FileUploadController {

    private final StorageService storageService;

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws IOException {
        Resource file = storageService.loadAsResource(filename);
        Tika tika = new Tika();
        String mimeType = tika.detect(file.getFile());

        String contentType = mimeType;

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(new InputStreamResource(file.getInputStream()));


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