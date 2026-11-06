package com.rohitverma.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record SkillGroupRequest(
        @JsonProperty("group") @NotBlank String group,
        @NotBlank String label,
        List<String> items,
        Integer displayOrder
) {}
