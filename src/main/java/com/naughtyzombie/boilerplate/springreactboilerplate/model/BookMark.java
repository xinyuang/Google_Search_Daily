package com.naughtyzombie.boilerplate.springreactboilerplate.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.security.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookmark")
@Data
@NoArgsConstructor
public class BookMark {

	@EmbeddedId
    private BookmarkId id;
    
    @ManyToOne
    @JoinColumn(name = "user_id",insertable = false, updatable = false)
    private User user;
	
    @ManyToOne
    @JoinColumn(name = "news_id",insertable = false, updatable = false)
    private News news;
	
    @Column(name = "MARKDATE",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date markDate;
    
    public BookMark(BookmarkId id, String markDate)throws Exception{
        this.id = id;
        Date date= new SimpleDateFormat("yyyy-MM-dd").parse(markDate);  
        this.markDate = date;
    }
    
    public void setId(BookmarkId id) {
        this.id = id;
    }
}