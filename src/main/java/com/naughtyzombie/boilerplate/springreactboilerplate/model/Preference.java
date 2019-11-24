package com.naughtyzombie.boilerplate.springreactboilerplate.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.security.User;

import lombok.Data;
import lombok.NoArgsConstructor;

	@Entity
	@Table(name = "preference")
	@Data
	@NoArgsConstructor
public class Preference {
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Long id;
		
		@ManyToMany(mappedBy = "preferences", fetch = FetchType.LAZY)
		private List<User> user;
		
		
		 @Column(name = "List", length=50)
		 @NotNull
		 @Enumerated(EnumType.STRING)
		 private PreferenceList preferenceList;
		 
	
//		@OneToOne
//		private User user;
	//	
//		@OneToOne
//		private User created_at;
		
		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}
		
		public PreferenceList getpreferenceList() {
		      return preferenceList;
		}
		   
		public void setpreferenceList( PreferenceList preferenceList ) {
		      this.preferenceList = preferenceList;
	    }
		
//		public User getuser() {
//			return user;
//		}
	//
//		public void setuser(User user) {
//			this.user = user;
//		}
//		public User getcountry_code() {
//			return country_code;
//		}
	//
//		public void setcountry_code(User country_code) {
//			this.country_code = country_code;
//		}
//		public User getcreate_at() {
//			return create_at;
//		}
	//
//		public void setcreate_at(User create_at) {
//			this.create_at = create_at;
//		}
}
