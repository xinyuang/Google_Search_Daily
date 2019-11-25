package com.FLAG_camp.google_search_daily.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PreferId implements Serializable {
 
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "user_id")
    private Long userId;
 
    @Column(name = "newscategory_id")
    private Long newscategoryId;
 
    public PreferId(Long userId, Long newscategoryId) {
        this.userId = userId;
        this.newscategoryId = newscategoryId;
    }
 
    public Long getuserId() {
        return userId;
    }
 
    public Long getnewsCategoryId() {
        return newscategoryId;
    }
 
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PreferId)) return false;
        PreferId that = (PreferId) o;
        return Objects.equals(getuserId(), that.getuserId()) &&
                Objects.equals(getnewsCategoryId(), that.getnewsCategoryId());
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(getuserId(), getnewsCategoryId());
    }
}
