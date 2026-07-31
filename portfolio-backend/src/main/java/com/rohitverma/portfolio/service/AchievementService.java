package com.rohitverma.portfolio.service;

import com.rohitverma.portfolio.dto.AchievementRequest;
import com.rohitverma.portfolio.entity.Achievement;
import com.rohitverma.portfolio.exception.ResourceNotFoundException;
import com.rohitverma.portfolio.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public List<Achievement> findAll() {
        return achievementRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Achievement create(AchievementRequest req) {
        Achievement achievement = Achievement.builder()
                .title(req.title())
                .organization(req.organization())
                .description(req.description())
                .dateLabel(req.dateLabel())
                .link(req.link())
                .icon(req.icon())
                .displayOrder(req.displayOrder() != null ? req.displayOrder() : 0)
                .build();
        return achievementRepository.save(achievement);
    }

    public Achievement update(Long id, AchievementRequest req) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found: " + id));

        achievement.setTitle(req.title());
        achievement.setOrganization(req.organization());
        achievement.setDescription(req.description());
        achievement.setDateLabel(req.dateLabel());
        achievement.setLink(req.link());
        achievement.setIcon(req.icon());
        if (req.displayOrder() != null) achievement.setDisplayOrder(req.displayOrder());

        return achievementRepository.save(achievement);
    }

    public void delete(Long id) {
        if (!achievementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Achievement not found: " + id);
        }
        achievementRepository.deleteById(id);
    }
}
