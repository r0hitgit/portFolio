package com.rohitverma.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record PostRequest(
        @NotBlank String title,
        @NotBlank String slug,
        String excerpt,
        @NotBlank String content,
        String tags,
        boolean published
) {}
