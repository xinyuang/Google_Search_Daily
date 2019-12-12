package com.FLAG_camp.google_search_daily.resource;

import static com.FLAG_camp.google_search_daily.GoogleSearchDailyApplication.logger;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FLAG_camp.google_search_daily.model.security.User;
import com.FLAG_camp.google_search_daily.security.service.JwtUserDetailsService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class Register {

    @Autowired
    JwtUserDetailsService userService;

    @RequestMapping(value = "/register", method = POST)
    public boolean addBook(@RequestBody User user) {
        logger.info("User Add request {}", user);
        return userService.addUser(user);
    }

}
