//package com.naughtyzombie.boilerplate.springreactboilerplate.resource;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.naughtyzombie.boilerplate.springreactboilerplate.model.News;
//import com.naughtyzombie.boilerplate.springreactboilerplate.service.NewsService;
//
//import java.util.List;
//
//import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
//import static org.springframework.web.bind.annotation.RequestMethod.GET;
//import static org.springframework.web.bind.annotation.RequestMethod.POST;
//
//@RestController
//@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
//@Slf4j
//public class NewsResource {
//
//    @Autowired
//    NewsService newsService;
//
//    @RequestMapping(path = "/markednews", method = GET)
//    public List<News> getAllBooks() {
//        return newsService.getAllNews();
//    }
//
//    @RequestMapping(path = "/favnews", method = POST)
//    public List<News> addBook(@RequestBody News news) {
//        log.info("Book Add request {}", news);
//        newsService.addNews(news);
//
//        return newsService.getAllNews();
//    }
//
//}
