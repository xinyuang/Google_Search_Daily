package com.FLAG_camp.google_search_daily.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.SearchHistory;
import com.FLAG_camp.google_search_daily.repository.SearchHistoryRepository;

@Service("SearchHistoryService")
public class SearchHistoryService {
	
	@Autowired
	SearchHistoryRepository searchHistoryRepository;
	
	public List<SearchHistory> getAllSearchHistorys(){
		return searchHistoryRepository.findAll();
	}
	
	public List<Object[]> findUserSearchHistory(Long userId){
		return searchHistoryRepository.findByUserId(userId);
	}
	
	public boolean addSearchHistory(SearchHistory searchHistory) {
		SearchHistory save = searchHistoryRepository.save(searchHistory);
		return save != null;
	}

}
