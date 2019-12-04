package com.FLAG_camp.google_search_daily.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.repository.NewsRepository;

@Service("TestService")
public class TestService {
	
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