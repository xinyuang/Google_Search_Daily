package com.naughtyzombie.boilerplate.springreactboilerplate.resource;

import static com.naughtyzombie.boilerplate.springreactboilerplate.SpringReactBoilerplateApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.Book;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.BookMark;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.BookmarkId;
import com.naughtyzombie.boilerplate.springreactboilerplate.service.BookMarkService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class BookMarkResource {

    @Autowired
    BookMarkService bookMarkService;

    @RequestMapping(path = "/allbookmarks", method = GET)
    public List<BookMark> getAllBooks() {
        return bookMarkService.getAllBookMarks();
    }

    @RequestMapping(path = "/addbookmark", method = POST)
    public List<BookMark> addBook(@RequestBody String bookmark) {
	try {
        logger.info("Book Add request {}", bookmark);
		JSONObject obj = new JSONObject(bookmark.toString());
		Long userId = obj.getLong("userId");
		String newsId = obj.getString("newsId");
		String markDate = obj.getString("markDate");
		BookmarkId id = new BookmarkId(userId,newsId);
		BookMark bookmark_obj = new BookMark(id,markDate);
		bookMarkService.addBookMark(bookmark_obj);
        return new ArrayList<>();
    } catch (Exception e) {
        return null;
       }
    }

}
