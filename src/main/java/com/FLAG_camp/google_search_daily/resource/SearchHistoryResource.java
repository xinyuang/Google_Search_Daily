package com.FLAG_camp.google_search_daily.resource;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.SearchHistory;
import com.FLAG_camp.google_search_daily.model.SearchhistoryId;
import com.FLAG_camp.google_search_daily.model.security.User;
import com.FLAG_camp.google_search_daily.security.JwtTokenUtil;
import com.FLAG_camp.google_search_daily.service.SearchHistoryService;
import com.FLAG_camp.google_search_daily.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class SearchHistoryResource {

	@Autowired
    private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
    UserService userService;
	
	@Autowired
	SearchHistoryService searchHistoryService;
	
	@RequestMapping(path = "/getsearchhistorys", method = GET)
    public List<Object[]> getUserSearchHistory (@RequestHeader(value="Authorization") String authorizationHeader) {        
       	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	
    	return searchHistoryService.findUserSearchHistory(user_id);
    }
    
    @RequestMapping(path = "/addsearchhistorys", method = POST)
    public void addUserSearchHistorys (@RequestBody String searchhistorys, @RequestHeader(value="Authorization") String authorizationHeader) {        
       	String authToken = authorizationHeader.substring(7);
    	String username = jwtTokenUtil.getUsernameFromToken(authToken);
    	User user = userService.findUserId(username);
    	Long user_id = user.getId();
    	
    	JSONObject obj = new JSONObject(searchhistorys);
    	JSONArray array = obj.getJSONArray("searchhistory");
    	for (int i = 0; i < array.length(); i++)
    	{
    		String search_term = obj.getString("searchTerm");
    		String setDate = obj.getString("setDate");
    		SearchhistoryId id = new SearchhistoryId(user_id,search_term);
    		SearchHistory searchhis_obj;
    		try {
    			searchhis_obj = new SearchHistory(id,setDate);
    			searchHistoryService.addSearchHistory(searchhis_obj);
    		}catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  		
    		
    	}
    }
    
}
