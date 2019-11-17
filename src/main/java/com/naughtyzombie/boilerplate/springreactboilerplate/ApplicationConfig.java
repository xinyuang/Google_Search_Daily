package com.naughtyzombie.boilerplate.springreactboilerplate;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class ApplicationConfig {

//	@Bean(name = "sessionFactory")
//	public LocalSessionFactoryBean sessionFactory() {
//		LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
//		sessionFactory.setDataSource(dataSource());
//		sessionFactory.setPackagesToScan("com.naughtyzombie.boilerplate.springreactboilerplate.model");
//		sessionFactory.setHibernateProperties(hibernateProperties());
//		return sessionFactory;
//	}
//
//	@Bean(name = "dataSource")
//	public DataSource dataSource() {
//		DriverManagerDataSource dataSource = new DriverManagerDataSource();
//		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
//		dataSource.setUrl("jdbc:mysql://localhost:3306/google_search_daily?useSSL=false");
//		dataSource.setUsername("admin");
//		dataSource.setPassword("flag");
//
//		return dataSource;
//	}
//
//	@Bean
//	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
//	    //JpaVendorAdapteradapter can be autowired as well if it's configured in application properties.
//	    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//	    vendorAdapter.setGenerateDdl(false);
//
//	    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
//	    factory.setJpaVendorAdapter(vendorAdapter);
//	    //Add package to scan for entities.
//	    factory.setPackagesToScan("com.naughtyzombie.boilerplate.springreactboilerplate.repository");
//	    factory.setDataSource(dataSource());
//	    return factory;
//	}
//	
//	@Bean
//	public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
//	    JpaTransactionManager txManager = new JpaTransactionManager();
//	    txManager.setEntityManagerFactory(entityManagerFactory);
//	    return txManager;
//	}
//	
//	
//	@Bean
//	public MultipartResolver multipartResolver() {
//		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
//		multipartResolver.setMaxUploadSize(10240000);
//		return multipartResolver;
//	}
//	
//
//	private final Properties hibernateProperties() {
//		Properties hibernateProperties = new Properties();
//		hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "update");
//		hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
//		return hibernateProperties;
//	}
}
