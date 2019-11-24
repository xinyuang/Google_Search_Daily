package com.naughtyzombie.boilerplate.springreactboilerplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.naughtyzombie.boilerplate.springreactboilerplate.model.Preference;
import com.naughtyzombie.boilerplate.springreactboilerplate.model.PreferenceList;

public interface PreferenceRepository extends JpaRepository<Preference, Long>{

	PreferenceList save(PreferenceList preferenceList);

	PreferenceList save(Long userId, PreferenceList preferenceList);

}
