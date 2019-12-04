package com.FLAG_camp.google_search_daily.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FLAG_camp.google_search_daily.model.Book;

@Repository
public interface BookRespository extends JpaRepository<Book, Long> {
}
