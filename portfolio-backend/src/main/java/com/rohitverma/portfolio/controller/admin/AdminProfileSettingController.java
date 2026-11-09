package com.rohitverma.portfolio.controller.admin;

import com.rohitverma.portfolio.dto.ResumeUpdateRequest;
import com.rohitverma.portfolio.service.ProfileSettingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
public class AdminProfileSettingController {

    private final ProfileSettingService profileSettingService;

    @GetMapping
    public Map<String, String> getSettings() {
        return profileSettingService.getAllSettings();
    }

    @PutMapping("/resume")
    public Map<String, String> updateResume(@Valid @RequestBody ResumeUpdateRequest req) {
        String updated = profileSettingService.updateResumeUrl(req.resumeUrl());
        return Map.of("resumeUrl", updated);
    }
}

