package com.naughtyzombie.boilerplate.springreactboilerplate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.Preference;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.PreferenceList;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.UserLikePreference;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.security.User;
import com.naughtyzombie.boilerplate.springreactboilerplate.repository.PreferenceRepository;
import com.naughtyzombie.boilerplate.springreactboilerplate.repository.UserLikePreferenceRepository;
import com.naughtyzombie.boilerplate.springreactboilerplate.security.repository.UserRepository;

import lombok.experimental.var;



@Service("preferenceService")
public class PreferenceService {

	@Autowired
	private PreferenceRepository preferenceRepository;
	private UserRepository userRepository;
	private UserLikePreferenceRepository userLikePreferenceRepository;
	
	public List<Preference> getAllPreference(){
		return preferenceRepository.findAll();
	}
	public Optional<Preference> getAllPreferenceById(Long userId){
		return preferenceRepository.findById(userId);
	}
	public boolean addPreference(Long userId, PreferenceList preferenceList){
		int preferenceNum = PreferenceList.values().length;
		UserLikePreference userLikePreference = new UserLikePreference();
		for(int num = 0; num<=preferenceNum-1;num++) {
		userLikePreference.setUserLikePreference(userId, preferenceList);
		userLikePreferenceRepository.save(userLikePreference);
		}
		return userLikePreference !=null;
	}
	public void deletePreference(Long id) {
		preferenceRepository.deleteById(id);
	}
//	public void updatePreference(Long id){
//		preferenceRepository.saveAll(Iterable<id>);
//	}
}
