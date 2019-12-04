package com.FLAG_camp.google_search_daily.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.Book;
import com.FLAG_camp.google_search_daily.repository.BookRespository;

@Service("bookService")
public class BookService {
    @Autowired
    private BookRespository bookRespository;

    public List<Book> getAllBooks() {
        return bookRespository.findAll();
    }

    public boolean addBook(Book book) {
        Book save = bookRespository.save(book);

        return save != null;
    }
}
