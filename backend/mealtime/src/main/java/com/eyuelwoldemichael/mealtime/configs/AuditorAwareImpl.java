package com.eyuelwoldemichael.mealtime.configs;

import com.eyuelwoldemichael.mealtime.models.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.Authentication;

import java.util.Optional;

/**
 * Implementation of AuditorAware to extract current user id from SecurityContextHolder
 *
 * @author Eyuel Woldemichael
 */
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {

        return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .map(User.class::cast).map(User::getId);
    }
}