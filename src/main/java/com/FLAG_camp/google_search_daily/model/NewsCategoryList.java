package com.FLAG_camp.google_search_daily.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.FLAG_camp.google_search_daily.model.security.User;

@Entity
@Table(name = "newscategory_list")
public class NewsCategoryList {
	
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "Category", length = 50)
    @Enumerated(EnumType.STRING)
    private NewsCategory newsCategory;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NewsCategory getName() {
        return newsCategory;
    }

    public void setName(NewsCategory newsCategory) {
        this.newsCategory = newsCategory;
    }

}
