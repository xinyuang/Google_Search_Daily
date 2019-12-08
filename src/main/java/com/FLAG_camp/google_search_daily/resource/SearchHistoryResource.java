package com.FLAG_camp.google_search_daily.resource;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.service.SearchHistoryService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class SearchHistoryResource {
	@Autowired
	SearchHistoryService searchHistoryService;
	
	@RequestMapping(path = "/topquery", method = GET)
	public List<String> getSortedQueryTerms() throws Exception {
		return searchHistoryService.sortQueryTerms();
	}
}
