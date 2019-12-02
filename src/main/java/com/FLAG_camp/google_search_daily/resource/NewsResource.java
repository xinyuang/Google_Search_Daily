package com.FLAG_camp.google_search_daily.resource;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.service.NewsService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class NewsResource {

    @Autowired
    NewsService newsService;
    
    @RequestMapping(path = "/topnews", method = GET)
    public List<News> getTopNews() throws Exception {
    	return newsService.getTopNewsFromApi();
    }
    
    @RequestMapping(path = "/querynews", method = GET)
    public List<News> getQueryNews(@RequestParam(value="q") String queryKeyword) throws Exception {
    	return newsService.getQueryNewsFromApi(queryKeyword);
    }
    
    @RequestMapping(path = "/categorynews", method = GET)
    public List<News> getCategoryNews(@RequestParam(value="category") String category) throws Exception {
    	return newsService.getCategoryNewsFromApi(category);
    }
    
//    @RequestMapping(path = "/markednews", method = GET)
//    public List<News> getAllNews() {
//        return newsService.getAllNews();
//    }
//
//    @RequestMapping(path = "/favnews", method = POST)
//    public List<News> addNews(@RequestBody News news) {
//    	logger.info("News Add request {}", news);
//    	System.out.print(news);
//        newsService.addNews(news);
//
//        return newsService.getAllNews();
//    }
//
//    @RequestMapping(path="/delnews/{id}")
//    public List<News> deleteById(@PathVariable String id) {
//     try {
//    	 newsService.deleteNews(id);
//      return newsService.getAllNews();
//     } catch (Exception e) {
//      return null;
//     }
//    }
//    
//    @RequestMapping("/getWithRequestParam")
//    public String getWithRequestParam(@RequestParam(value = "personDTO") String personDTO)
//        throws IOException {
//    		logger.info("News Add request {}", personDTO);
//			JSONObject obj = new JSONObject(personDTO.toString());
//			if(!obj.isNull("_embedded")) {
//				JSONObject newsId = obj.getJSONObject("newID");
//				
//				return "good";
//			}
//    		return "empty";
//    }

}
