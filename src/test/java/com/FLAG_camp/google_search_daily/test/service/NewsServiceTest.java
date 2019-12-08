package com.FLAG_camp.google_search_daily.test.service;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.service.NewsService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NewsServiceTest {
	@Autowired
	private NewsService newsService;
	
//	@Test
//	public void saveAllFetchedData() throws Exception {
//		newsService.saveNewsFetchedFromApi();
//	}
	
	/*
	@Test
	public void getTopNewsFromApiWillReturnCorrectly() throws Exception {
		List<News> news = newsService.getTopNewsFromApi(0L);
		Assert.assertNotNull(news);
	}
	
	@Test
	public void getQueryNewsWillReturnCorrectly() throws Exception {
		List<News> news = newsService.getQueryNewsFromApi("China");
		Assert.assertNotNull(news);
	}
	
	@Test
	public void getCategoryNewsWillReturnCorrectly() throws Exception {
		List<News> news = newsService.getCategoryNewsFromApi("Business");
		Assert.assertEquals(10, news.size());
	}
	*/
}
