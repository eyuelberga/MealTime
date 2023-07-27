package com.eyuelwoldemichael.mealtime.dto.auth.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private String id;
    private String name;
    private String email;
    private String role;
    private String refreshToken;
    private String accessToken;
}
