package com.FLAG_camp.google_search_daily.resource;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.FLAG_camp.google_search_daily.service.RawDBDemoGeoIPLocationService;
import com.FLAG_camp.google_search_daily.service.SearchHistoryService;
import com.FLAG_camp.google_search_daily.service.UserService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.security.JwtTokenUtil;
import com.FLAG_camp.google_search_daily.service.NewsService;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

import static com.FLAG_camp.google_search_daily.SpringReactBoilerplateApplication.logger;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class NewsResource {

    @Autowired
    NewsService newsService;
    
    @Autowired
    UserService userService;
    
    @Autowired
    SearchHistoryService searchHistoryService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private RawDBDemoGeoIPLocationService locationService;

    @RequestMapping(path = "/topnews", method = GET)
    public List<News> getTopNews(@RequestParam(value="offset") Long offset) throws Exception {
        logger.info("Offset in news resource is {}", offset);
    	return newsService.getTopNewsFromApi(offset);
    }

    @RequestMapping(path = "/querynews", method = GET)
    public List<News> getQueryNews(
    		@RequestHeader(value="authorization", required = false) String authorizationHeader,
    		@RequestParam(value="q") String queryKeyword,
    		@RequestParam(value="offset") Long offset) throws Exception {
    	// save query terms to searchHistory table after logging in
    	if (authorizationHeader != null) {
        	String authToken = authorizationHeader.substring(7);
        	String username = jwtTokenUtil.getUsernameFromToken(authToken);
        	Long userId = userService.findUserId(username).getId();
        	searchHistoryService.saveQueryTerms(queryKeyword, userId);
    	}
    	// fetch news from api by query terms
    	System.out.println("queryKeyword:" + queryKeyword);
    	System.out.println("queryNewsFromApi: " + newsService.getQueryNewsFromApi(queryKeyword, offset));
    	return newsService.getQueryNewsFromApi(queryKeyword, offset);
    }

    @RequestMapping(path = "/querynewsbygeo", method = GET)
    public List<News> getQueryNewsByGeo(@RequestParam(value="q") String queryKeyword, HttpServletRequest request,
                                        @RequestParam(value="radius") String rad,
                                        @RequestParam(value="offset") Long offset
    ) throws Exception {
        String ip = request.getRemoteAddr();
        if (ip.equalsIgnoreCase("0:0:0:0:0:0:0:1")) {
            Enumeration en = NetworkInterface.getNetworkInterfaces();
            NetworkInterface ni=(NetworkInterface) en.nextElement();
            Enumeration ee = ni.getInetAddresses();
            InetAddress ia = (InetAddress) ee.nextElement();
            ip = ia.getHostAddress() ;
            int idx = ip.indexOf('%');
            ip = ip.substring(0,idx);
        }
        Map<String,String> ipInfo = locationService.getLocation(ip);
        double lat = Double.parseDouble(ipInfo.get("latitude:"));
        double lon = Double.parseDouble(ipInfo.get("longitude:"));
        int radius = Integer.parseInt(rad);
        return newsService.getQueryNewsByGeoFromApi(queryKeyword, offset, lat, lon, radius);
    }

    @RequestMapping(path = "/categorynews", method = GET)
    public List<News> getCategoryNews(@RequestParam(value="category") String category,
    								  @RequestParam(value="offset") Long offset
    								) throws Exception {
        return newsService.getCategoryNewsFromApi(category, offset);
    }

}
