package com.naughtyzombie.boilerplate.springreactboilerplate.service;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.BookMark;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.BookmarkId;
import com.naughtyzombie.boilerplate.springreactboilerplate.repository.BookMarkRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("BookMarkService")
public class BookMarkService {
	
    @Autowired
    private BookMarkRepository bookMarkRepository;

    public List<BookMark> getAllBookMarks() {
        return bookMarkRepository.findAll();
    }

    public boolean addBookMark(BookMark bookMark) {
    	BookMark save = bookMarkRepository.save(bookMark);
        return save != null;
    }
    
    public void deleteBookMark(BookmarkId bookMarkId) {
    	bookMarkRepository.deleteById(bookMarkId);
    }
    
    public Optional<BookMark> oneBookMark(BookmarkId bookMarkId) {
    	return bookMarkRepository.findById(bookMarkId);
    }
}
