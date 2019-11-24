package com.FLAG_camp.google_search_daily.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.FLAG_camp.google_search_daily.model.News;


public interface NewsRepository extends JpaRepository<News, String>  {
}
