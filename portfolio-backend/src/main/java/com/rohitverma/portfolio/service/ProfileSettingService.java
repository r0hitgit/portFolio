package com.rohitverma.portfolio.service;

import com.rohitverma.portfolio.entity.ProfileSetting;
import com.rohitverma.portfolio.repository.ProfileSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProfileSettingService {

    public static final String KEY_RESUME_URL = "resume_url";
    public static final String DEFAULT_RESUME_URL = "https://drive.google.com/file/d/12cmWu28HCIjOfpUJ3lKyZJnWudCkVLPW/view?usp=sharing";

    private final ProfileSettingRepository profileSettingRepository;

    public String getResumeUrl() {
        return profileSettingRepository.findByKey(KEY_RESUME_URL)
                .map(ProfileSetting::getValue)
                .filter(url -> !url.isBlank())
                .orElse(DEFAULT_RESUME_URL);
    }

    public String updateResumeUrl(String resumeUrl) {
        ProfileSetting setting = profileSettingRepository.findByKey(KEY_RESUME_URL)
                .orElse(ProfileSetting.builder().key(KEY_RESUME_URL).build());

        setting.setValue(resumeUrl != null ? resumeUrl.trim() : "");
        profileSettingRepository.save(setting);
        return setting.getValue();
    }

    public Map<String, String> getAllSettings() {
        Map<String, String> result = new HashMap<>();
        result.put("resumeUrl", getResumeUrl());
        return result;
    }
}

