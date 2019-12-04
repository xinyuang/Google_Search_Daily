package com.FLAG_camp.google_search_daily.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.model.security.User;
import com.FLAG_camp.google_search_daily.security.repository.UserRepository;

@Service("userService")
public class UserService {
	
    @Autowired
    private UserRepository userRespository;

    public User findUserId(String username) {
    	return userRespository.findByUsername(username);
    }
}
