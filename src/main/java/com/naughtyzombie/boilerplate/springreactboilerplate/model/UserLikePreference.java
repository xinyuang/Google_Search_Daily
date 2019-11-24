package com.naughtyzombie.boilerplate.springreactboilerplate.model;

import java.io.Serializable;

import javax.persistence.Column;

public class UserLikePreference{

	@Column(name = "user_id")
    private Long userId;
 
    @Column(name = "preference_id")
    private PreferenceList preferenceList;
    
    public UserLikePreference() {
    }
 
    public void setUserLikePreference(Long userId, PreferenceList preferenceList) {
        this.userId = userId;
        this.preferenceList = preferenceList;
    }
 
    public Long getuserId() {
        return userId;
    }
 
    public PreferenceList getpreferenceList() {
        return preferenceList;
    }
}
