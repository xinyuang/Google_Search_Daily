package com.FLAG_camp.google_search_daily.resource;

import static com.FLAG_camp.google_search_daily.GoogleSearchDailyApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.service.TestService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class testResource {

    @Autowired
    TestService testService;

    @RequestMapping(path = "/markednews", method = GET)
    public List<News> getAllNews() {
        return testService.getAllNews();
    }

    @RequestMapping(path = "/favnews", method = POST)
    public List<News> addNews(@RequestBody News news) {
    	logger.info("News Add request {}", news);
    	System.out.print(news);
    	testService.addNews(news);

        return testService.getAllNews();
    }

    @RequestMapping(path="/delnews/{id}")
    public List<News> deleteById(@PathVariable String id) {
     try {
    	 testService.deleteNews(id);
      return testService.getAllNews();
     } catch (Exception e) {
      return null;
     }
    }
    
    @RequestMapping("/getWithRequestParam")
    public String getWithRequestParam(@RequestParam(value = "personDTO") String personDTO)
        throws IOException {
    		logger.info("News Add request {}", personDTO);
			JSONObject obj = new JSONObject(personDTO.toString());
			if(!obj.isNull("_embedded")) {
				JSONObject newsId = obj.getJSONObject("newID");
				
				return "good";
			}
    		return "empty";
    }

}