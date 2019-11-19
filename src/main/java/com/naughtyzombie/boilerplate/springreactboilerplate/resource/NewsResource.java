package com.naughtyzombie.boilerplate.springreactboilerplate.resource;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.News;
import com.naughtyzombie.boilerplate.springreactboilerplate.service.NewsService;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;

import static com.naughtyzombie.boilerplate.springreactboilerplate.SpringReactBoilerplateApplication.logger;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class NewsResource {

    @Autowired
    NewsService newsService;

    @RequestMapping(path = "/markednews", method = GET)
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @RequestMapping(path = "/favnews", method = POST)
    public List<News> addNews(@RequestBody News news) {
    	logger.info("News Add request {}", news);
    	System.out.print(news);
        newsService.addNews(news);

        return newsService.getAllNews();
    }

    @RequestMapping(path="/delnews/{id}")
    public List<News> deleteById(@PathVariable long id) {
     try {
    	 newsService.deleteNews(id);
      return newsService.getAllNews();
     } catch (Exception e) {
      return null;
     }
    }

}
