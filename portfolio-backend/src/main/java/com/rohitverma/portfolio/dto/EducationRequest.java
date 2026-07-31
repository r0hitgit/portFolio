package com.rohitverma.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record EducationRequest(
        @NotBlank String institution,
        String degree,
        String location,
        String scoreLabel,
        String startLabel,
        String endLabel,
        Integer displayOrder
) {}
