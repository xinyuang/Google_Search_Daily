package com.FLAG_camp.google_search_daily.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.FLAG_camp.google_search_daily.model.PreferId;
import com.FLAG_camp.google_search_daily.model.UserPreference;


public interface UserPreferenceRepository extends JpaRepository<UserPreference, PreferId>  {
	  @Query(value = "SELECT newscategory_id FROM user_preference WHERE user_id = ?1", nativeQuery = true)
	  List<Object[]> findByUserId(Long userId);
}