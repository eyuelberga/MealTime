package com.eyuelberga.mealtime.api.security;

import com.nimbusds.jwt.JWTClaimNames;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Map;

public class PrincipalUtils {
    public static Jwt getPrincipal() {
        return (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    }

    public static String getId() {
        return getPrincipal().getClaim(JWTClaimNames.SUBJECT);
    }
}
