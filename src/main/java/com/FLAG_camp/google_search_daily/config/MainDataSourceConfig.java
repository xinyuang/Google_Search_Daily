package com.FLAG_camp.google_search_daily.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.FLAG_camp.google_search_daily.model.News;
import com.FLAG_camp.google_search_daily.repository.NewsRepository;
import com.FLAG_camp.google_search_daily.security.repository.UserRepository;

@Configuration
@ComponentScan(basePackageClasses = {News.class})
@EnableJpaRepositories(
	basePackageClasses = {News.class, NewsRepository.class, UserRepository.class}
)
public class MainDataSourceConfig {

}
