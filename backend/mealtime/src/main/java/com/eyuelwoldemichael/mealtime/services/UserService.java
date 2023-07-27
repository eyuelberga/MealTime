package com.eyuelwoldemichael.mealtime.services;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    /**
     *
     * @return org.springframework.security.core.userdetails.UserDetailsService
     */
    UserDetailsService userDetailsService();
}
