package com.FLAG_camp.google_search_daily.resource;

import static com.FLAG_camp.google_search_daily.GoogleSearchDailyApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.Book;
import com.FLAG_camp.google_search_daily.service.BookService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class BookResource {

    @Autowired
    BookService bookService;

    @RequestMapping(path = "/allbooks", method = GET)
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @RequestMapping(path = "/addbook", method = POST)
    public List<Book> addBook(@RequestBody Book book) {
        logger.info("Book Add request {}", book);
        bookService.addBook(book);

        return bookService.getAllBooks();
    }

}
