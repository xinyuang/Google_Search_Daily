package com.naughtyzombie.boilerplate.springreactboilerplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.UserLikePreference;

public interface UserLikePreferenceRepository extends JpaRepository<UserLikePreference, Long>{

}
