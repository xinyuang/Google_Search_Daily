package com.FLAG_camp.google_search_daily.resource;

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
    
    @RequestMapping(path = "/querynewsbygeo", method = GET)
    public List<News> getQueryNewsByGeo(@RequestParam(value="q") String queryKeyword,
    		@RequestParam(value="lat") String latitude,
    		@RequestParam(value="lon") String longitude,
    		@RequestParam(value="radius") String rad
    		) throws Exception {
    	double lat = Double.parseDouble(latitude);
    	double lon = Double.parseDouble(longitude);
    	int radius = Integer.parseInt(rad);
    	return newsService.getQueryNewsByGeoFromApi(queryKeyword, lat, lon, radius);
    }
    
    @RequestMapping(path = "/categorynews", method = GET)
    public List<News> getCategoryNews(@RequestParam(value="category") String category) throws Exception {
    	return newsService.getCategoryNewsFromApi(category);
    }

}
