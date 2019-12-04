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
	
	private final String SUBSCRIPTION_KEY = "08578fb106fd45299541397fd22e25aa";
	private final String HOST = "https://api.cognitive.microsoft.com";
	private final String PATH = "/bing/v7.0/news";
	private final String SUB_PATH = "";
	private final String DEFAULT_KEYWORD = "";
	
	@VisibleForTesting
	public List<News> getGeneralNews() throws Exception {
		// create connection
		String subPath = SUB_PATH;
		String queryKeyword = "sailing+dinghies";
		HttpsURLConnection connection = createConnection(subPath, queryKeyword);
		connection.connect();
		
		int responseCode = connection.getResponseCode();
	    if (responseCode != 200) {
	    	return null;
	    }

	    JSONArray news = parseResponseToJsonArray(connection);
	    return convertJsonArrayToNewsList(news);
	}
	
	@VisibleForTesting
	public List<News> getTodayTopNews() throws Exception {
		String subPath = "/search";
		String queryKeyword = "&mkt=en-us";
		HttpsURLConnection connection = createConnection(subPath, queryKeyword);
		connection.connect();
		
		int responseCode = connection.getResponseCode();
	    if (responseCode != 200) {
	    	return null;
	    }
	    
	    JSONArray news = parseResponseToJsonArray(connection);
	    return convertJsonArrayToNewsList(news);
	}
	
	@VisibleForTesting
	public List<News> getQueryNews(String queryKeyword) throws Exception {
		String subPath = "/search";
		HttpsURLConnection connection = createConnection(subPath, queryKeyword);
		connection.connect();
		
		int responseCode = connection.getResponseCode();
	    if (responseCode != 200) {
	    	return null;
	    }
	    JSONArray news = parseResponseToJsonArray(connection);
		return convertJsonArrayToNewsList(news);
	}
	
	@VisibleForTesting
	public List<News> getQueryNewsByGeoLocation(String queryKeyword, double lat, double lon, int radius) throws Exception {
		String subPath = "/search";
		HttpsURLConnection connection = createGeoBasedConnection(subPath, queryKeyword, lat, lon, radius);
		connection.connect();
		
		int responseCode = connection.getResponseCode();
	    if (responseCode != 200) {
	    	return null;
	    }
	    JSONArray news = parseResponseToJsonArray(connection);
		return convertJsonArrayToNewsList(news);
	}
	
	@VisibleForTesting
	public List<News> getCategoryNews(String category) throws Exception {
		String subPath = SUB_PATH;
		HttpsURLConnection connection = createCategoryQueryConnection(subPath, category);
		connection.connect();
		
		int responseCode = connection.getResponseCode();
	    if (responseCode != 200) {
	    	return null;
	    }
	    JSONArray news = parseResponseToJsonArray(connection);
		return convertJsonArrayToNewsList(news);
	}
	
	private HttpsURLConnection createConnection(String subPath, String queryKeyword) throws Exception {
		URL url = new URL(HOST + PATH + subPath + "?q=" +  URLEncoder.encode(queryKeyword, "UTF-8"));
		System.out.println(url.toString());
		HttpsURLConnection connection = (HttpsURLConnection)url.openConnection();
	    connection.setRequestProperty("Ocp-Apim-Subscription-Key", SUBSCRIPTION_KEY);
	    connection.setRequestProperty("X-Search-ClientIP", "999.999.999.999");
	    connection.setRequestMethod("GET");
	    return connection;
	}
	
	private HttpsURLConnection createGeoBasedConnection(String subPath, String queryKeyword, double lat, double lon, int radius) throws Exception {
		URL url = new URL(HOST + PATH + subPath + "?q=" +  URLEncoder.encode(queryKeyword, "UTF-8"));
		String LAT = "lat:" + lat + ";";
		String LONG = "long:" + lon + ";";
		String RAD = "re:" + radius;
		String GEO_LOCATION = LAT + LONG + RAD;
		System.out.println(GEO_LOCATION);
		HttpsURLConnection connection = (HttpsURLConnection)url.openConnection();
	    connection.setRequestProperty("Ocp-Apim-Subscription-Key", SUBSCRIPTION_KEY);
	    connection.setRequestProperty("X-Search-Location", GEO_LOCATION);
	    connection.setRequestProperty("X-Search-ClientIP", "999.999.999.999");
	    connection.setRequestMethod("GET");
	    return connection;
	}
	
	private HttpsURLConnection createCategoryQueryConnection(String subPath, String queryKeyword) throws Exception {
		URL url = new URL(HOST + PATH + SUB_PATH + "?category=" +  URLEncoder.encode(queryKeyword, "UTF-8"));
		HttpsURLConnection connection = (HttpsURLConnection)url.openConnection();
	    connection.setRequestProperty("Ocp-Apim-Subscription-Key", SUBSCRIPTION_KEY);
	    connection.setRequestProperty("X-Search-ClientIP", "999.999.999.999");
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
			if (!newsObj.isNull("image")) {
				JSONObject imgObj = newsObj.getJSONObject("image");
				if (!imgObj.isNull("thumbnail")) {
					JSONObject imgThumbnailObj = imgObj.getJSONObject("thumbnail");
					if (!imgThumbnailObj.isNull("contentUrl")) {
						newNews.setImgUrl(imgThumbnailObj.getString("contentUrl"));
					}
					if (!imgThumbnailObj.isNull("width")) {
						newNews.setImgWidth(imgThumbnailObj.getInt("width"));
					}
					if (!imgThumbnailObj.isNull("height")) {
						newNews.setImgHeight(imgThumbnailObj.getInt("height"));
					}
				}
			}
			if (!newsObj.isNull("description")) {
				newNews.setContent(newsObj.getString("description"));
			}
			if (!newsObj.isNull("provider")) {
				JSONArray providerArray = newsObj.getJSONArray("provider");
				JSONObject providerObj = providerArray.getJSONObject(0);
				if (providerObj!= null && providerObj.length()!= 0) {
					if (!providerObj.isNull("name")) {
						newNews.setNewsProviderName(providerObj.getString("name"));
					} 
				} 
			}
			if (!newsObj.isNull("datePublished")) {
				newNews.setDatePublished(dateTimeFormatter(newsObj.getString("datePublished")));
			}
			if (!newsObj.isNull("category")) {
				newNews.setCategory(newsObj.getString("category"));
			}
			
			newsList.add(newNews);
		}
		return newsList;
	}
	
	private LocalDateTime dateTimeFormatter(String dateTimeStr) {
		String input = dateTimeStr.replace ( "T" , " " );
		String inputModified = input.replace ( "Z" , "" );
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSSS");
		LocalDateTime dateTime = LocalDateTime.parse(inputModified, formatter);
		return dateTime;
	}
    
}

