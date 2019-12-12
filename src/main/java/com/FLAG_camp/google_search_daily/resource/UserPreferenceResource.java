package com.FLAG_camp.google_search_daily.resource;

import static com.FLAG_camp.google_search_daily.GoogleSearchDailyApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.PreferId;
import com.FLAG_camp.google_search_daily.model.UserPreference;
import com.FLAG_camp.google_search_daily.model.security.User;
import com.FLAG_camp.google_search_daily.security.JwtTokenUtil;
import com.FLAG_camp.google_search_daily.service.UserPreferService;
import com.FLAG_camp.google_search_daily.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class UserPreferenceResource {

    @Autowired
    UserPreferService userPreferService;
    
    @Autowired
    UserService userService;
       
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @RequestMapping(path = "/getpreference", method = GET)
    public List<Object[]> getUserprefernce(@RequestHeader(value="authorization") 
    						String authorizationHeader) {
    	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
        return userPreferService.findUserPreference(user_id);
    }

    @RequestMapping(path = "/addpreference", method = POST)
    public void addNews(@RequestBody String prefernces, 
    		            @RequestHeader(value="authorization") String authorizationHeader) {
    	logger.info("News Add request {}", prefernces);
    	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	
    	JSONObject obj = new JSONObject(prefernces);
    	JSONArray array = obj.getJSONArray("preference");
    	for (int i = 0; i < array.length(); i++)
    	{
    		Long newscategory_id = array.getLong(i);
    		String setDate = obj.getString("setDate");
    		PreferId id = new PreferId(user_id,newscategory_id);
    		UserPreference userprefer_obj;
			try {
				userprefer_obj = new UserPreference(id,setDate);
				userPreferService.addUserPrefer(userprefer_obj);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  		
    	}
    }

    @RequestMapping(path = "/addonepreference", method = POST)
    public List<Object[]> addOnePreference(
    							@RequestBody String newsCategory, 
    							@RequestHeader(value="authorization") String authorizationHeader) {
    	// , @RequestParam(value="category") String newsCategory
    	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	
    	//logger.info("userId = {}", user_id);
    	JSONObject obj = new JSONObject(newsCategory);
    	Long newscategory_id = obj.getLong("category");
//    	Long newscategory_id = Long.parseLong(newsCategory);
    	//logger.info("category id = {}", newscategory_id);
		PreferId id = new PreferId(user_id, newscategory_id);
		//logger.info("preferId = {}", id);
		UserPreference userprefer_obj;
		//logger.info("Date = {}", LocalDate.now().toString());
		try {
			userprefer_obj = new UserPreference(id, LocalDate.now().toString());
			userPreferService.addUserPrefer(userprefer_obj);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userPreferService.findUserPreference(user_id);
    }
    
    @RequestMapping(path = "/deleteonepreference", method = POST)
    public List<Object[]> deleteOnePreference(
    							@RequestBody String newsCategory, 
    							@RequestHeader(value="authorization") String authorizationHeader) {
    	//, @RequestParam(value="category") String newsCategory
    	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	
    	//logger.info("userId = {}", user_id);
    	JSONObject obj = new JSONObject(newsCategory);
    	Long newscategory_id = obj.getLong("category");
//    	Long newscategory_id = Long.parseLong(newsCategory);
    	//logger.info("category id = {}", newscategory_id);
		PreferId id = new PreferId(user_id, newscategory_id);
		//logger.info("preferId = {}", id);
		
		userPreferService.deleteUserPrefer(id);
		return userPreferService.findUserPreference(user_id);
    }

}
