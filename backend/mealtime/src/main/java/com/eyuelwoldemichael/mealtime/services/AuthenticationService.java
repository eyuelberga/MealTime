package com.eyuelwoldemichael.mealtime.services;


import com.eyuelwoldemichael.mealtime.dto.auth.request.SignUpRequest;
import com.eyuelwoldemichael.mealtime.dto.auth.request.SignInRequest;
import com.eyuelwoldemichael.mealtime.dto.auth.response.JwtAuthenticationResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SignInRequest request);
}
