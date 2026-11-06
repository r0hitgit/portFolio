package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.entity.SkillGroup;
import com.rohitverma.portfolio.service.SkillGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillGroupController {

    private final SkillGroupService skillGroupService;

    @GetMapping
    public List<SkillGroup> list() {
        return skillGroupService.findAll();
    }
}
