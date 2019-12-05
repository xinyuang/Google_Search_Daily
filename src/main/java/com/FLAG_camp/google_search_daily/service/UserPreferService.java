package com.FLAG_camp.google_search_daily.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.PriorityQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.BookMark;
import com.FLAG_camp.google_search_daily.model.BookmarkId;
import com.FLAG_camp.google_search_daily.model.PreferId;
import com.FLAG_camp.google_search_daily.model.UserPreference;
import com.FLAG_camp.google_search_daily.repository.UserPreferenceRepository;

@Service("UserPreferService")
public class UserPreferService {
	
    @Autowired
    private UserPreferenceRepository userPreferenceRepository;

    public List<UserPreference> getAllUserprefer() {
        return userPreferenceRepository.findAll();
    }

    public boolean addUserPrefer(UserPreference userPreference) {
    	UserPreference save = userPreferenceRepository.save(userPreference);
        return save != null;
    }
    
    public void deleteUserPrefer(PreferId preferId) {
    	userPreferenceRepository.deleteById(preferId);;
    }
    
    
    public List<Object[]> findUserPreference(Long userId) {
    	return userPreferenceRepository.findByUserId(userId);
    }
    
    public List<String> calculateUserSearchTopWords(String[] searchTerms){
    	if (searchTerms == null || searchTerms.length == 0) {
    		return new ArrayList<String>(0);
    	}
    	int k = 15;
    	Map<String, Integer> stringToCountMap = new HashMap<>();
    	for (String searchTerm : searchTerms) {
    		if (stringToCountMap.containsKey(searchTerm)) {
    			stringToCountMap.put(searchTerm, stringToCountMap.get(searchTerm) + 1);
    		} else {
    			stringToCountMap.put(searchTerm, 1);
    		}
    	}
    	PriorityQueue<Map.Entry<String,Integer>> maxHeap = new PriorityQueue<>(k, new Comparator<Map.Entry<String,Integer>>(){
    		@Override
    		public int compare(Map.Entry<String, Integer> entry1, Map.Entry<String, Integer> entry2) {
    			if (entry1.equals(entry2)) {
    				return 0;
    			}
    			return entry1.getValue().compareTo(entry2.getValue()) > 0 ? -1 : 1;
    		}
    	});
    	for (Map.Entry<String, Integer> entry : stringToCountMap.entrySet()) {
    		maxHeap.offer(entry);
    	}
    	
    	if (k >= stringToCountMap.size()) {
    		List<String> resk = new ArrayList<>(stringToCountMap.size());
    		for (int i = 0; i < stringToCountMap.size(); i++) {
    			resk.add(maxHeap.poll().getKey());
    		}
    		return resk;
    	}
    	
    	List<String> res = new ArrayList<>(k);
    	for (int i = 0; i < k; i++) {
    		res.add(maxHeap.poll().getKey()); 
    	}
    	return res;
    }
}
