package com.FLAG_camp.google_search_daily.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.FLAG_camp.google_search_daily.GoogleSearchDailyApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Handle Validation Requests
 */
@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class ValidationResource {

	@RequestMapping(path = "/validate/{username}", method = GET)
	public String validate(@PathVariable(name = "username") String user) {
		logger.info("Authentication Validation Request for Request {}", user);
		return "VALIDATED";
	}
}
