package com.rohitverma.portfolio.service;

import com.rohitverma.portfolio.dto.PostRequest;
import com.rohitverma.portfolio.entity.Post;
import com.rohitverma.portfolio.exception.ResourceNotFoundException;
import com.rohitverma.portfolio.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<Post> findAllPublished() {
        return postRepository.findAllByPublishedTrueOrderByPublishedAtDesc();
    }

    public List<Post> findAllForAdmin() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post findPublishedBySlug(String slug) {
        return postRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found: " + slug));
    }

    public Post create(PostRequest req) {
        Post post = Post.builder()
                .title(req.title())
                .slug(req.slug())
                .excerpt(req.excerpt())
                .content(req.content())
                .tags(req.tags())
                .published(req.published())
                .publishedAt(req.published() ? LocalDateTime.now() : null)
                .build();
        return postRepository.save(post);
    }

    public Post update(Long id, PostRequest req) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found: " + id));

        boolean newlyPublished = req.published() && !post.isPublished();

        post.setTitle(req.title());
        post.setSlug(req.slug());
        post.setExcerpt(req.excerpt());
        post.setContent(req.content());
        post.setTags(req.tags());
        post.setPublished(req.published());
        if (newlyPublished) {
            post.setPublishedAt(LocalDateTime.now());
        }

        return postRepository.save(post);
    }

    public void delete(Long id) {
        if (!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Post not found: " + id);
        }
        postRepository.deleteById(id);
    }
}
