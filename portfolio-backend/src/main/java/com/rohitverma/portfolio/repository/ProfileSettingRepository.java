package com.rohitverma.portfolio.repository;

import com.rohitverma.portfolio.entity.ProfileSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileSettingRepository extends JpaRepository<ProfileSetting, String> {

    Optional<ProfileSetting> findByKey(String key);
}

