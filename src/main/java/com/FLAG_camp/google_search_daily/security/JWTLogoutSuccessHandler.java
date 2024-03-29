package com.FLAG_camp.google_search_daily.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.FLAG_camp.google_search_daily.GoogleSearchDailyApplication.logger;

import java.io.IOException;


@Component
@Slf4j
public class JWTLogoutSuccessHandler implements LogoutSuccessHandler {
	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		logger.info("Logout Request");
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().flush();
	}
}
