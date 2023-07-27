package com.eyuelwoldemichael.mealtime.controllers;


import com.eyuelwoldemichael.mealtime.dto.auth.request.SignUpRequest;
import com.eyuelwoldemichael.mealtime.dto.auth.request.SignInRequest;
import com.eyuelwoldemichael.mealtime.dto.auth.response.JwtAuthenticationResponse;
import com.eyuelwoldemichael.mealtime.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handing user authentication
 *
 * @author Eyuel Woldemichael
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    /**
     * Handle user sign up
     *
     * @param request SignUpRequest
     * @return ResponseEntity user information along with accessToken
     */
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    /**
     * Handle user sign in
     * @param request SignInRequest
     * @return ResponseEntity user information along with accessToken
     */
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request));

    }
}
