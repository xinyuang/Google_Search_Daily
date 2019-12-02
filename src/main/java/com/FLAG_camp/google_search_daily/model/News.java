package com.FLAG_camp.google_search_daily.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column(name = "news_url")
	private String newsUrl;
    
    @Column(name = "news_provider_name")
	private String newsProviderName;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "title")
    private String title;

    @Column(columnDefinition = "TEXT")
	private String content;
	
    @Column(name = "date_published")
	private LocalDateTime datePublished;
    
    @Column(name = "img_url")
	private String imgUrl;
    
    @Column(name = "img_width")
	private int imgWidth;
	
	@Column(name = "img_height")
	private int imgHeight;
	
	@Column(name = "img_provider_name")
	private String imgProviderName;
	
	@Column(name = "is_breaking_news")
	private boolean isBreakingNews;


	public String getNewsUrl() {
		return newsUrl;
	}

	public void setNewsUrl(String newsUrl) {
		this.newsUrl = newsUrl;
	}

	public String getNewsProviderName() {
		return newsProviderName;
	}
	
	public void setNewsProviderName(String newsProviderName) {
		this.newsProviderName = newsProviderName;
	}
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public LocalDateTime getDatePublished() {
		return datePublished;
	}
	
	public void setDatePublished(LocalDateTime datePublished) {
		this.datePublished = datePublished;
	}
	
	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getImgProviderName() {
		return newsProviderName;
	}
	
	public void setImgProviderName(String imgProviderName) {
		this.imgProviderName = imgProviderName;
	}
	
	public int getImgWidth() {
		return imgWidth;
	}
	
	public void setImgWidth(int imgWidth) {
		this.imgWidth = imgWidth;
	}
	
	public int getImgHeight() {
		return imgHeight;
	}
	
	public void setImgHeight(int imgHeight) {
		this.imgHeight = imgHeight;
	}
	public boolean getIsBreakingNews() {
		return isBreakingNews;
	}
	
	public void setIsBreakingNews(boolean isBreakingNews) {
		this.isBreakingNews = isBreakingNews;
	}
}