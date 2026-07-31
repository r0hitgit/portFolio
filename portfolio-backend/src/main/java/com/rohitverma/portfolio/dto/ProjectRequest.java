package com.rohitverma.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.List;

public record ProjectRequest(
        @NotBlank String title,
        @NotBlank String slug,
        String description,
        List<String> bullets,
        List<String> techStack,
        String repoUrl,
        String liveUrl,
        String imageUrl,
        LocalDate projectDate,
        boolean featured,
        Integer displayOrder
) {}
