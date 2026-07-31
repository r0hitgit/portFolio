package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.entity.EducationEntry;
import com.rohitverma.portfolio.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @GetMapping
    public List<EducationEntry> findAll() {
        return educationService.findAll();
    }
}
