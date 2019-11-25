package com.FLAG_camp.google_search_daily.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.FLAG_camp.google_search_daily.model.security.User;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user_preference")
public class UserPreference {

		@EmbeddedId
	    private PreferId id;
	
	    @ManyToOne
	    @JoinColumn(name = "user_id",insertable = false, updatable = false)
	    private User user;
		
	    @ManyToOne
	    @JoinColumn(name = "newscategory_id",insertable = false, updatable = false)
	    private NewsCategoryList newsCategory;
		
	    @Column(name = "SETDATE",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	    @Temporal(TemporalType.TIMESTAMP)
	    @NotNull
	    private Date setDate;
	    	    
	    public void setId(PreferId id) {
	        this.id = id;
	    }

}