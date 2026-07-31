package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.entity.Achievement;
import com.rohitverma.portfolio.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping
    public List<Achievement> findAll() {
        return achievementService.findAll();
    }
}
