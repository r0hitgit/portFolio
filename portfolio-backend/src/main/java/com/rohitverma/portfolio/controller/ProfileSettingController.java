package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.service.ProfileSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class ProfileSettingController {

    private final ProfileSettingService profileSettingService;

    @GetMapping
    public Map<String, String> getSettings() {
        return profileSettingService.getAllSettings();
    }

    @GetMapping("/resume")
    public Map<String, String> getResume() {
        return Map.of("resumeUrl", profileSettingService.getResumeUrl());
    }
}
