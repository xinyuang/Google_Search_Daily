package com.FLAG_camp.google_search_daily.resource;

import static com.FLAG_camp.google_search_daily.SpringReactBoilerplateApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.BookMark;
import com.FLAG_camp.google_search_daily.model.BookmarkId;
import com.FLAG_camp.google_search_daily.service.BookMarkService;

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
		JSONObject obj = new JSONObject(bookmark);
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
    
    
    @RequestMapping(path = "/findbookmark/{id}", method = GET)
    public List<Object[]> findUserBookMark(@PathVariable Long id) {
        return bookMarkService.findUserBookMark(id);
    }

}