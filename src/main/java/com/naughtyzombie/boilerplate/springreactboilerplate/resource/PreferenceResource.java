package com.naughtyzombie.boilerplate.springreactboilerplate.resource;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.News;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.Preference;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.PreferenceList;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.security.User;
import com.naughtyzombie.boilerplate.springreactboilerplate.service.PreferenceService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class PreferenceResource {

	@Autowired
	PreferenceService preferenceService;
	
	@RequestMapping(path = "/getpreference", method = GET)
	public List<Preference> getAllPreference(){
		return preferenceService.getAllPreference();
	}
	
	@RequestMapping(path ="/getpreference/{id}")
	public Optional<Preference> getAllPreference(@RequestParam(value = "userId") long userId){
		return preferenceService.getAllPreferenceById(userId);
	}
	
	@RequestMapping(path = "/addpreference", method = POST)
	public Optional<Preference> addPreference(@RequestParam(value = "userId") long userId, @RequestParam(value = "preferenceList") PreferenceList preferenceList){	
		preferenceService.addPreference(userId, preferenceList);
		return preferenceService.getAllPreferenceById(userId);
	}
	
	@RequestMapping(path = "/delpreference/{id}")
	public void deleteById(@PathVariable long id) {
			preferenceService.deletePreference(id);
	}
	
//	@RequestMapping(path = "/updatepreference/{id}")
//	public void updateById(@PathVariable long id, List<News> category) {
//		preferenceService.savePreference(category);
//	}

}
