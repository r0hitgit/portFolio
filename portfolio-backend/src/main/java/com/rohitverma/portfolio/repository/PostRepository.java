package com.rohitverma.portfolio.repository;

import com.rohitverma.portfolio.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByPublishedTrueOrderByPublishedAtDesc();
    List<Post> findAllByOrderByCreatedAtDesc();
    Optional<Post> findBySlug(String slug);
    Optional<Post> findBySlugAndPublishedTrue(String slug);
}
