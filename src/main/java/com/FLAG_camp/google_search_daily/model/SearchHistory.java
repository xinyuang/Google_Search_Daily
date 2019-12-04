package com.FLAG_camp.google_search_daily.model;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.FLAG_camp.google_search_daily.model.security.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "search_history")
@Data
@NoArgsConstructor
public class SearchHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private SearchhistoryId id;
	
	@ManyToOne
    @JoinColumn(name = "user_id",insertable = false, updatable = false)
    private User user;
	
	@Column(name = "search_term")
	private String searchTerm;
	
	@Column(name = "SETDATE",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date setDate;
	
	public void setId(SearchhistoryId id) {
        this.id = id;
    }
	
	public SearchHistory() {
		
	}
	
	public SearchHistory(SearchhistoryId id, String markDate)throws Exception{
        this.id = id;
        Date date= new SimpleDateFormat("yyyy-MM-dd").parse(markDate);  
        this.setDate = date;
    }

}
