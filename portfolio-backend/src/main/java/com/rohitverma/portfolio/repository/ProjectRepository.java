package com.rohitverma.portfolio.repository;

import com.rohitverma.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByDisplayOrderAsc();
    Optional<Project> findBySlug(String slug);
}
