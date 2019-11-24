package com.FLAG_camp.google_search_daily.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.FLAG_camp.google_search_daily.model.BookMark;
import com.FLAG_camp.google_search_daily.model.BookmarkId;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, BookmarkId> {
	
  @Query(value = "SELECT news_id FROM bookmark WHERE user_id = ?1", nativeQuery = true)
  List<Object[]> findByUserId(Long userId);
}
