package com.naughtyzombie.boilerplate.springreactboilerplate.service;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.News;
import com.naughtyzombie.boilerplate.springreactboilerplate.repository.NewsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("newsService")
public class NewsService {
    @Autowired
    private NewsRepository newsRespository;

    public List<News> getAllNews() {
        return newsRespository.findAll();
    }

    public boolean addNews(News news) {
        News save = newsRespository.save(news);
        return save != null;
    }
    
    public void deleteNews(String newsId) {
    	newsRespository.deleteById(newsId);
    }
    
    public Optional<News> oneNews(String newsId) {
    	return newsRespository.findById(newsId);
    }
}
