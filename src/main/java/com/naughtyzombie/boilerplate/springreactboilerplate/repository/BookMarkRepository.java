package com.naughtyzombie.boilerplate.springreactboilerplate.repository;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.BookMark;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.BookmarkId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, BookmarkId> {
}
