package com.rohitverma.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record AchievementRequest(
        @NotBlank String title,
        String organization,
        String description,
        String dateLabel,
        String link,
        String icon,
        Integer displayOrder
) {}
