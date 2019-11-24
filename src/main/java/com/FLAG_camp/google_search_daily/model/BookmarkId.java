package com.FLAG_camp.google_search_daily.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class BookmarkId implements Serializable {
 
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "user_id")
    private Long userId;
 
    @Column(name = "news_id")
    private String newsId;
 
    public BookmarkId() {
    }
 
    public BookmarkId(Long userId, String newsId) {
        this.userId = userId;
        this.newsId = newsId;
    }
 
    public Long getuserId() {
        return userId;
    }
 
    public String getnewsId() {
        return newsId;
    }
 
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BookmarkId)) return false;
        BookmarkId that = (BookmarkId) o;
        return Objects.equals(getuserId(), that.getuserId()) &&
                Objects.equals(getnewsId(), that.getnewsId());
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(getuserId(), getnewsId());
    }
}
