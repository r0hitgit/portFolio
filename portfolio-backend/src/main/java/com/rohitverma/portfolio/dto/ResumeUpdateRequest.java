package com.rohitverma.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record ResumeUpdateRequest(
        @NotBlank String resumeUrl
) {}

