package com.FLAG_camp.google_search_daily.test.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringRunner;

import com.FLAG_camp.google_search_daily.model.Book;
import com.FLAG_camp.google_search_daily.service.BookService;

@RunWith(SpringRunner.class)
@SpringBootTest
@SqlGroup({
        @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:insert.sql"),
        @Sql(executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD, scripts = "classpath:clean.sql")
})
public class BookServiceTest {

    @Autowired
    private BookService bookService;

    @Test
    public void getAllBooks() {
        List<Book> allBooks = bookService.getAllBooks();
        assertThat(allBooks).isNotNull();
    }


}