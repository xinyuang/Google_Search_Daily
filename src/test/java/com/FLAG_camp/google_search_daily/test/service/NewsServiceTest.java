package com.FLAG_camp.google_search_daily.test.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.FLAG_camp.google_search_daily.service.NewsService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NewsServiceTest {
	@Autowired
	private NewsService newsService;
	
	@Test
	public void saveAllFetchedData() throws Exception {
		newsService.saveNewsFetchedFromApi();
	}
	
}
