package com.FLAG_camp.google_search_daily.service;

import java.util.List;
import java.util.Optional;

import org.assertj.core.util.VisibleForTesting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.repository.NewsRepository;

@Service("newsService")
public class NewsService {
	@Autowired 
	private NewsRepository newsRepository;
	
	@Autowired
	private NewsApiService newsApiService;
	
	@VisibleForTesting
	public void saveNewsFetchedFromApi() throws Exception {
		List<News> allFetchedNews = newsApiService.getGeneralNews();
		newsRepository.saveAll(allFetchedNews);
	}
	
	@VisibleForTesting
	public List<News> getTopNewsFromApi() throws Exception {
		return newsApiService.getTodayTopNews();
	}
	
	@VisibleForTesting
	public List<News> getQueryNewsFromApi(String queryKeyword) throws Exception {
		System.out.println(queryKeyword);
		return newsApiService.getQueryNews(queryKeyword);
	}
	
	@VisibleForTesting
	public List<News> getCategoryNewsFromApi(String category) throws Exception {
		return newsApiService.getCategoryNews(category);
	}
}
