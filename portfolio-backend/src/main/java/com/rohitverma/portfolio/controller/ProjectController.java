package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.entity.Project;
import com.rohitverma.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public List<Project> findAll() {
        return projectService.findAll();
    }

    @GetMapping("/{slug}")
    public Project findBySlug(@PathVariable String slug) {
        return projectService.findBySlug(slug);
    }
}
