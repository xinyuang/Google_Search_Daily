package com.FLAG_camp.google_search_daily.service;

import java.net.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.io.*;
import javax.net.ssl.HttpsURLConnection;

import org.assertj.core.util.VisibleForTesting;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.FLAG_camp.google_search_daily.model.News;

@Service("newsApiService")
public class NewsApiService {
	
	private String SUBSCRIPTION_KEY = "08578fb106fd45299541397fd22e25aa";
	private String HOST = "https://api.cognitive.microsoft.com";
	private String PATH = "/bing/v7.0/news";
	private String DEFAULT_KEYWORD = "";
	
	@VisibleForTesting
	public List<News> getGeneralNews() throws Exception {
		// create connection
		String queryKeyword = "sailing+dinghies";
		HttpsURLConnection connection = createConnection(queryKeyword);
		connection.connect();
		
		int responseCode = connection.getResponseCode();
	    if (responseCode != 200) {
	    	return null;
	    }

	    JSONArray news = parseResponseToJsonArray(connection);
	    return convertJsonArrayToNewsList(news);
	}
	
//	// Get top news
//	public JSONArray getTopNews() throws Exception {
//		// create connection
//		HttpsURLConnection connection = createConnection(null);
//		// log
//		int responseCode = connection.getResponseCode();
//	    logger.info("Sending request to url: " + HOST + PATH + "?q=" + DEFAULT_KEYWORD);
//	    logger.info("Response code: " + responseCode);
//	    // if not succeed
//	    if (responseCode != 200) {
//	    	return new JSONArray();
//	    }
//	    // if succeed
//	    JSONArray news = parseResponseToJsonArray(connection);
//	    return news;
//	}
//	
//	// Query news with keywords
//	public JSONArray getQueryNews(String queryKeyword) throws Exception {
//		HttpsURLConnection connection = createConnection(queryKeyword);
//		
//		int responseCode = connection.getResponseCode();
//	    logger.info("Sending request to url: " + HOST + PATH + "?q=" + queryKeyword);
//	    logger.info("Response code: " + responseCode);
//	    if (responseCode != 200) {
//	    	return new JSONArray();
//	    }
//	    JSONArray news = parseResponseToJsonArray(connection);
//		return news;
//	}
//	
	private HttpsURLConnection createConnection(String queryKeyword) throws Exception {
		if (queryKeyword == null) {
			queryKeyword = DEFAULT_KEYWORD;
		}
		URL url = new URL(HOST + PATH + "?q=" +  URLEncoder.encode(queryKeyword, "UTF-8"));
		HttpsURLConnection connection = (HttpsURLConnection)url.openConnection();
	    connection.setRequestProperty("Ocp-Apim-Subscription-Key", SUBSCRIPTION_KEY);
	    connection.setRequestProperty("X-Search-ClientIP", "999.999.999.999");
	    connection.setRequestProperty("X-Search-Location", "lat:47.60357;long:-122.3295;re:100");
	    connection.setRequestMethod("GET");
	    return connection;
	}
	
	private JSONArray parseResponseToJsonArray(HttpsURLConnection connection) throws Exception {
	    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		String line;
		StringBuilder response = new StringBuilder();
		while ((line = reader.readLine()) != null) {
			response.append(line);
		}
		reader.close();
		
		JSONObject obj = new JSONObject(response.toString());
		if (!obj.isNull("value")) {
			return obj.getJSONArray("value");
		}	
		return new JSONArray();
	}
	
	private List<News> convertJsonArrayToNewsList(JSONArray allNews) throws JSONException {	
		if (allNews == null) {
			return null;
		}
		List<News> newsList = new ArrayList<>();
		for (int i = 0; i < allNews.length(); ++i) {
			JSONObject newsObj = allNews.getJSONObject(i);
			News newNews = new News();
			if (!newsObj.isNull("name")) {
				newNews.setTitle(newsObj.getString("name"));
			}
			if (!newsObj.isNull("url")) {
				newNews.setNewsUrl(newsObj.getString("url"));
			}
			if (!newsObj.isNull("description")) {
				newNews.setContent(newsObj.getString("description"));
			}
			if (!newsObj.isNull("provider")) {
				JSONArray providerArray = newsObj.getJSONArray("provider");
				JSONObject providerObj = (JSONObject)providerArray.get(0);
				if (providerObj!= null && !providerObj.toString().isEmpty()) {
					newNews.setNewsProviderName(providerObj.getString("name"));
				} else {
					newNews.setNewsProviderName("");
				}
			}
			if (!newsObj.isNull("category")) {
				newNews.setCategory(newsObj.getString("category"));
			}
			newNews.setDatePublished(LocalDateTime.now());
			newsList.add(newNews);
		}
		return newsList;
	}
	
	private LocalDateTime dateTimeFormatter(String dateTimeStr) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-ddTHH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(dateTimeStr, formatter);
		return dateTime;
	}
    
}

