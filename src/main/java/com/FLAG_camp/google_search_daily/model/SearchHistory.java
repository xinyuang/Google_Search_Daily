package com.FLAG_camp.google_search_daily.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import javax.persistence.*;

import com.FLAG_camp.google_search_daily.model.security.User;

@Entity
@Table(name = "search_history")
@Data
@NoArgsConstructor
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	@Column(name = "user_id")
    private Long userId;
    
	////don't use foreign key because we can save search without login.
	//@ManyToOne
    //@JoinColumn(name = "user_id",insertable = false, updatable = false)
    //private User user;
    
	@Column(name = "search_term")
	private String searchTerm;
	
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
    	return userId;
    }
    
    public void setUserId(Long userId) {
    	this.userId = userId;
    }
    
    public String getSearchTerm() {
    	return searchTerm;
    }
    
    public void setSearchTerm(String searchTerm) {
    	this.searchTerm = searchTerm;
    }
}
