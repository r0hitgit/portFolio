package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.dto.AchievementRequest;
import com.rohitverma.portfolio.entity.Achievement;
import com.rohitverma.portfolio.service.AchievementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/achievements")
@RequiredArgsConstructor
public class AdminAchievementController {

    private final AchievementService achievementService;

    @PostMapping
    public ResponseEntity<Achievement> create(@Valid @RequestBody AchievementRequest request) {
        return ResponseEntity.ok(achievementService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achievement> update(@PathVariable Long id, @Valid @RequestBody AchievementRequest request) {
        return ResponseEntity.ok(achievementService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        achievementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
