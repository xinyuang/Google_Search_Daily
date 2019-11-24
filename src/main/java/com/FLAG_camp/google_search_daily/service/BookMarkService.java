package com.FLAG_camp.google_search_daily.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.BookMark;
import com.FLAG_camp.google_search_daily.model.BookmarkId;
import com.FLAG_camp.google_search_daily.repository.BookMarkRepository;

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
    
    public List<Object[]> findUserBookMark(Long userId) {
    	return bookMarkRepository.findByUserId(userId);
    }
}
