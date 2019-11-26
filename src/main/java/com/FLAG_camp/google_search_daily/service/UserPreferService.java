package com.FLAG_camp.google_search_daily.service;

import java.util.List;
import java.util.Optional;

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
}
