package com.naughtyzombie.boilerplate.springreactboilerplate;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.Book;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.News;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.Preference;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.PreferenceList;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.UserLikePreference;
import com.naughtyzombie.boilerplate.springreactboilerplate.repository.BookRespository;
import com.naughtyzombie.boilerplate.springreactboilerplate.repository.PreferenceRepository;
import com.naughtyzombie.boilerplate.springreactboilerplate.repository.UserLikePreferenceRepository;
import com.naughtyzombie.boilerplate.springreactboilerplate.security.repository.UserRepository;


@Configuration
@ComponentScan(basePackageClasses = {Book.class})
@EnableJpaRepositories(
		basePackageClasses = {Book.class, News.class, Preference.class, PreferenceList.class, UserLikePreference.class, PreferenceRepository.class, UserLikePreferenceRepository.class, BookRespository.class, UserRepository.class}
		)
public class MainDataSourceConfig {
	
}