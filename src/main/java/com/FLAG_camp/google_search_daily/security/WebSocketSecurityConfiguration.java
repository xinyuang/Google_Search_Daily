package com.FLAG_camp.google_search_daily.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class WebSocketSecurityConfiguration extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    @Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry message) {
        message
			.nullDestMatcher().permitAll()
			.simpDestMatchers("/app/**").authenticated()
			.simpDestMatchers("/topic/**").authenticated()
			.anyMessage().hasRole("USER");
    }

	@Override
	protected boolean sameOriginDisabled() {
		return true;
	}
}
