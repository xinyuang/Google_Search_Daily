package com.FLAG_camp.google_search_daily.resource;

import static com.FLAG_camp.google_search_daily.SpringReactBoilerplateApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.model.BookMark;
import com.FLAG_camp.google_search_daily.model.BookmarkId;
import com.FLAG_camp.google_search_daily.model.security.User;
import com.FLAG_camp.google_search_daily.service.NewsService;
import com.FLAG_camp.google_search_daily.service.BookMarkService;
import com.FLAG_camp.google_search_daily.security.JwtTokenUtil;
import com.FLAG_camp.google_search_daily.service.UserService;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class BookMarkResource {

    @Autowired
    BookMarkService bookMarkService;
    
    @Autowired
    UserService userService;
    
    @Autowired
    NewsService newsService;
       
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @RequestMapping(path = "/allbookmarks", method = GET)
    public List<Object[]> getAllBookMarks(@RequestHeader(value="Authorization") String authorizationHeader) {        
       	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	
    	List<Object[]> newsList = bookMarkService.findUserBookMark(user_id);
    	Object[] resultArray = new Object[newsList.size()];

    	for(int i = 0; i < newsList.size(); i++) {
    		Optional<News> news = newsService.oneNews(newsList.get(i)[0].toString());
    		resultArray[i] = news;
    	}
    	
    	List<Object[]> result = new ArrayList<>();
    	result.add(resultArray);
    	return result;
    }

    @RequestMapping(path = "/addbookmark", method = POST)
    public List<Object[]> addBookMark(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody String body) {
    	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	//logger.info("user_id is {}", user_id);
    	
    	try {
			JSONObject obj = new JSONObject(body);
			String markDate = obj.getString("markDate");			
			JSONObject news_obj = obj.getJSONObject("news");
			News news = new News();
			/*
			news.setNewsUrl(news_obj.getString("id"));
			news.setNewsProviderName(news_obj.getString("img_url"));
			news. (news_obj.getString("news_url"));
			news.setCategory(news_obj.getString("category"));
			news.setTitle(news_obj.getString("title"));
			news.setContent(news_obj.getString("content"));
			*/
			news.setCategory(news_obj.getString("category"));
			news.setContent(news_obj.getString("content"));
			
			//logger.info("news content is {}", news.getContent());
			
			////DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime dateTime = LocalDateTime.parse(news_obj.getString("datePublished"), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
			//logger.info("dataTime is {}", dateTime);
			news.setDatePublished(dateTime);
			//logger.info("get dateTime after set it - {}", news.getDatePublished());
			
			news.setImgHeight(news_obj.getInt("imgHeight"));
			//logger.info("imgHeight is {}", news.getImgHeight());
			news.setImgProviderName(news_obj.getString("imgProviderName"));
			//logger.info("img provider name {}", news.getImgProviderName());
			news.setImgUrl(news_obj.getString("imgUrl"));
			news.setImgWidth(news_obj.getInt("imgWidth"));
			news.setIsBreakingNews(news_obj.getBoolean("isBreakingNews"));
			news.setNewsProviderName(news_obj.getString("newsProviderName"));
			news.setNewsUrl(news_obj.getString("newsUrl"));
			news.setTitle(news_obj.getString("title"));
			//logger.info("title is {}", news.getTitle());
			
			
	    	newsService.addNews(news);
	    	String news_id = news.getNewsUrl(); //id is url
	    	//logger.info("news_id after insert {}", news_id);
	    	
			BookmarkId id = new BookmarkId(user_id, news_id);
			BookMark bookmark_obj = new BookMark(id, markDate);
			bookMarkService.addBookMark(bookmark_obj);
			
			//to return news obj to front end
	    	List<Object[]> newsList = bookMarkService.findUserBookMark(user_id);
	    	Object[] resultArray = new Object[newsList.size()];

	    	for(int i = 0; i < newsList.size(); i++) {
	    		//Optional<News> newsItem = newsService.oneNews(newsList.get(i)[0].toString());
	    		//resultArray[i] = newsItem;
	    		resultArray[i] = newsService.oneNews(newsList.get(i)[0].toString());
	    	}
	    	
	    	List<Object[]> result = new ArrayList<>();
	    	result.add(resultArray);
	    	return result;
    	} catch (Exception e) {
    		return null;
    	}
    }
    
    @RequestMapping(path = "/deletebookmark", method = POST)
    public List<Object[]> deleteBookMark(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody News news) {
    	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	
    	try {
	        //logger.info("Bookmark delete request {}", body);
			//JSONObject obj = new JSONObject(body);
			//JSONObject news_obj = obj.getJSONObject("news");
			//String news_id = news_obj.getString("id"); //FIXME to url
			//Note: we don't delete news DB
			
			BookmarkId id = new BookmarkId(user_id, news.getNewsUrl());
			bookMarkService.deleteBookMark(id);
	        
	        List<Object[]> newsList = bookMarkService.findUserBookMark(user_id);
	    	Object[] resultArray = new Object[newsList.size()];

	    	for(int i = 0; i < newsList.size(); i++) {
	    		Optional<News> newsItem = newsService.oneNews(newsList.get(i)[0].toString());
	    		resultArray[i] = newsItem;
	    	}
	    	
	    	List<Object[]> result = new ArrayList<>();
	    	result.add(resultArray);
	    	return result;	        
    	} catch (Exception e) {
    		return null;
    	}
    }
    
    /*
    @RequestMapping(path = "/findbookmark/{id}", method = GET)
    public List<BookMark> findUserBookMark(@PathVariable Long id) {
        return bookMarkService.findUserBookMark(id);
    }
    */

}
