package com.FLAG_camp.google_search_daily.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

import org.assertj.core.util.VisibleForTesting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.SearchHistory;
import com.FLAG_camp.google_search_daily.repository.SearchHistoryRepository;

@Service("searchHistoryService")
public class SearchHistoryService {
	
	@Autowired
	private SearchHistoryRepository searchHistoryRepository;
	
	@VisibleForTesting
	public void saveQueryTerms(String searchTerm, Long userId) {
		searchHistoryRepository.saveSearchTermByUser(searchTerm, userId);
	}
	
	@VisibleForTesting
	public List<String> sortQueryTerms() {
		List<SearchHistory> allQueryHistories = searchHistoryRepository.findAll();
		if (allQueryHistories == null || allQueryHistories.size() == 0) {
			return new ArrayList<String>();
		}
		Map<String, Integer> queryTermToCountMap = new HashMap<>();
		for (SearchHistory queryHistory : allQueryHistories) {
			String key = queryHistory.getSearchTerm();
			if (key == null || key == "" || key == "undefined") {
				continue;
			}
			if (queryTermToCountMap.containsKey(key)) {
				queryTermToCountMap.put(key, queryTermToCountMap.get(key) + 1);
			} else {
				queryTermToCountMap.put(key, 1);
			}
		}
		int k = 10;
		PriorityQueue<Map.Entry<String, Integer>> maxHeap = new PriorityQueue<>(k, new Comparator<Map.Entry<String, Integer>>() {
			@Override 
			public int compare(Map.Entry<String, Integer> entry1, Map.Entry<String, Integer> entry2) {
				if (entry1.getValue().equals(entry2.getValue())) {
					return 0;
				}
				return entry1.getValue().compareTo(entry2.getValue()) > 0 ? -1 : 1;
			}
		});
		for (Map.Entry<String, Integer> entry : queryTermToCountMap.entrySet()) {
			maxHeap.offer(entry);
		}
		
		if (k >= queryTermToCountMap.size()) {
			List<String> topKQueryTerms = new ArrayList<>(queryTermToCountMap.size());
			for (int i = 0; i < queryTermToCountMap.size(); i++) {
				topKQueryTerms.add(maxHeap.poll().getKey());
			}
			return topKQueryTerms;
		} 
		
		List<String> topKQueryTerms = new ArrayList<>(k);
		for (int i = 0; i < k; i++) {
			topKQueryTerms.add(maxHeap.poll().getKey());
		}
		return topKQueryTerms;
	}
}
