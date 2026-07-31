package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.entity.Post;
import com.rohitverma.portfolio.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<Post> findAllPublished() {
        return postService.findAllPublished();
    }

    @GetMapping("/{slug}")
    public Post findBySlug(@PathVariable String slug) {
        return postService.findPublishedBySlug(slug);
    }
}
