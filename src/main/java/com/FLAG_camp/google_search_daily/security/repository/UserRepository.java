package com.FLAG_camp.google_search_daily.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.FLAG_camp.google_search_daily.model.security.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
