package com.FLAG_camp.google_search_daily.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;


@Embeddable
public class SearchhistoryId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "user_id")
    private Long userId;
	
	@Column(name = "search_term")
    private String searchTerm;
	
	public SearchhistoryId() {
		
	}
	
	public SearchhistoryId(Long userId, String searchTerm) {
		this.userId = userId;
		this.searchTerm = searchTerm;
	}
	
	public Long getuserId() {
        return userId;
    }
	
	public String getsearchTerm() {
        return searchTerm;
    }
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SearchhistoryId)) return false;
        SearchhistoryId that = (SearchhistoryId) o;
        return Objects.equals(getuserId(), that.getuserId()) &&
                Objects.equals(getsearchTerm(), that.getsearchTerm());
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(getuserId(), getsearchTerm());
    }
}
