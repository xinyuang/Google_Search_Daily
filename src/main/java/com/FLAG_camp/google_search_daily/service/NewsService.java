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
	
	/*
	@VisibleForTesting
	public void saveNewsFetchedFromApi() throws Exception {
		List<News> allFetchedNews = newsApiService.getGeneralNews();
		newsRepository.saveAll(allFetchedNews);
	}
	*/
	
	@VisibleForTesting
	public List<News> getTopNewsFromApi(Long offset) throws Exception {
		return newsApiService.getTodayTopNews(offset);
	}
	
	@VisibleForTesting
	public List<News> getQueryNewsFromApi(String queryKeyword, Long offset) throws Exception {
		List<News> newsFromApi = newsApiService.getQueryNews(queryKeyword, offset);
//		System.out.println("in NewsService - newsFromApi: " + newsFromApi);
		return newsFromApi;
	}
	
	@VisibleForTesting
	public List<News> getQueryNewsByGeoFromApi(String queryKeyword, Long offset, double lat, double lon, int radius) throws Exception {
		System.out.println(queryKeyword);
		System.out.println("lat: " + lat);
		System.out.println("lon: " + lon);
		System.out.println("radius: " + radius);
		return newsApiService.getQueryNewsByGeoLocation(queryKeyword, offset, lat, lon, radius);
	}
	
	@VisibleForTesting
	public List<News> getCategoryNewsFromApi(String category, Long offset) throws Exception {
		return newsApiService.getCategoryNews(category, offset);
	}
	
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public boolean addNews(News news) {
        News save = newsRepository.save(news);
        return save != null;
    }
    
    public void deleteNews(String newsId) {
    	newsRepository.deleteById(newsId);
    }
    
    public Optional<News> oneNews(String newsId) {
    	return newsRepository.findById(newsId);
    }
}
