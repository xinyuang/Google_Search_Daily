package com.FLAG_camp.google_search_daily.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.FLAG_camp.google_search_daily.model.SearchHistory;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long>{

	@Query(value = "SELECT search_term FROM search_history WHERE user_id = ?1", nativeQuery = true)
	List<Object[]> findByUserId(Long userId);
	
	@Query(value = "SELECT search_term FROM search_history", nativeQuery = true)
	List<Object[]> findAllSearchTerms();
	
	@Transactional
	@Modifying
	@Query(value = "INSERT INTO search_history (search_term, user_id) VALUES (:searchTerm, :userId)", nativeQuery = true)
	void saveSearchTermByUser(@Param("searchTerm")String searchTerm, @Param("userId")Long userId);
	
}
