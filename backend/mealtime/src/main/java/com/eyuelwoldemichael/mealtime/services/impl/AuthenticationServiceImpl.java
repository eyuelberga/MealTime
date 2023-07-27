package com.eyuelwoldemichael.mealtime.services.impl;

import com.eyuelwoldemichael.mealtime.dto.auth.request.SignUpRequest;
import com.eyuelwoldemichael.mealtime.dto.auth.request.SignInRequest;
import com.eyuelwoldemichael.mealtime.dto.auth.response.JwtAuthenticationResponse;
import com.eyuelwoldemichael.mealtime.models.Role;
import com.eyuelwoldemichael.mealtime.models.User;
import com.eyuelwoldemichael.mealtime.repositories.UserRepository;
import com.eyuelwoldemichael.mealtime.services.AuthenticationService;
import com.eyuelwoldemichael.mealtime.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        var user = User.builder().name(request.getName())
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CLIENT).build();
        User u = userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        //TODO add refresh token here
        return JwtAuthenticationResponse.builder()
                .accessToken(jwt)
                .name(u.getName())
                .refreshToken("")
                .id(u.getId())
                .email(u.getEmail())
                .role(u.getRole().toString())
                .build();
    }

    @Override
    public JwtAuthenticationResponse signin(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var u = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(u);
        return JwtAuthenticationResponse.builder()
                .accessToken(jwt)
                .name(u.getName())
                .refreshToken("")
                .id(u.getId())
                .email(u.getEmail())
                .role(u.getRole().toString())
                .build();
    }
}
