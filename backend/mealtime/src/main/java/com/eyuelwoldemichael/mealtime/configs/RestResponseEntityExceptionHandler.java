package com.eyuelwoldemichael.mealtime.configs;

import com.eyuelwoldemichael.mealtime.exceptions.ResourceNotFoundException;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * Global exception handling for controllers
 *
 * @author Eyuel Woldemichael
 */
@ControllerAdvice
@Slf4j
public class RestResponseEntityExceptionHandler
        extends ResponseEntityExceptionHandler {

    @Data
    @AllArgsConstructor
    @RequiredArgsConstructor
    class ErrorResponse {
        private final String message;
        private String body;
    }


    @Override
    @Nullable
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, List<String>> body = new HashMap<>();

        String errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining("\n", "", ""));
        log.error(ex.toString(), errors);
        return handleExceptionInternal(ex, new ErrorResponse(errors), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }


    @ExceptionHandler(value = {BadCredentialsException.class})
    protected ResponseEntity<Object> handleLoginError(Exception ex, WebRequest request) {
        log.error(ex.toString());
        return handleExceptionInternal(ex, new ErrorResponse("Invalid Email or Password"), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {ResourceNotFoundException.class})
    protected ResponseEntity<Object> handleNotFound(Exception ex, WebRequest request) {
        log.error(ex.toString());
        return handleExceptionInternal(ex, new ErrorResponse(ex.getMessage()), new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = {Exception.class})
    protected ResponseEntity<Object> handleUncaughtException(Exception ex, WebRequest request) {
        log.error(ex.toString());
        return handleExceptionInternal(ex, new ErrorResponse(ex.getMessage()), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}