package com.rohitverma.portfolio.service;

import com.rohitverma.portfolio.dto.ProjectRequest;
import com.rohitverma.portfolio.entity.Project;
import com.rohitverma.portfolio.exception.ResourceNotFoundException;
import com.rohitverma.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<Project> findAll() {
        return projectRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Project findBySlug(String slug) {
        return projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + slug));
    }

    public Project create(ProjectRequest req) {
        Project project = Project.builder()
                .title(req.title())
                .slug(req.slug())
                .description(req.description())
                .bullets(req.bullets() != null ? new ArrayList<>(req.bullets()) : new ArrayList<>())
                .techStack(req.techStack() != null ? new ArrayList<>(req.techStack()) : new ArrayList<>())
                .repoUrl(req.repoUrl())
                .liveUrl(req.liveUrl())
                .imageUrl(req.imageUrl())
                .projectDate(req.projectDate())
                .featured(req.featured())
                .displayOrder(req.displayOrder() != null ? req.displayOrder() : 0)
                .build();
        return projectRepository.save(project);
    }

    public Project update(Long id, ProjectRequest req) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id));

        project.setTitle(req.title());
        project.setSlug(req.slug());
        project.setDescription(req.description());
        project.setBullets(req.bullets() != null ? new ArrayList<>(req.bullets()) : new ArrayList<>());
        project.setTechStack(req.techStack() != null ? new ArrayList<>(req.techStack()) : new ArrayList<>());
        project.setRepoUrl(req.repoUrl());
        project.setLiveUrl(req.liveUrl());
        project.setImageUrl(req.imageUrl());
        project.setProjectDate(req.projectDate());
        project.setFeatured(req.featured());
        if (req.displayOrder() != null) project.setDisplayOrder(req.displayOrder());

        return projectRepository.save(project);
    }

    public void delete(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found: " + id);
        }
        projectRepository.deleteById(id);
    }
}
