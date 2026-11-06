package com.rohitverma.portfolio.controller.admin;

import com.rohitverma.portfolio.dto.SkillGroupRequest;
import com.rohitverma.portfolio.entity.SkillGroup;
import com.rohitverma.portfolio.service.SkillGroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/skills")
@RequiredArgsConstructor
public class AdminSkillGroupController {

    private final SkillGroupService skillGroupService;

    @GetMapping
    public List<SkillGroup> list() {
        return skillGroupService.findAll();
    }

    @PostMapping
    public ResponseEntity<SkillGroup> create(@Valid @RequestBody SkillGroupRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(skillGroupService.create(req));
    }

    @PutMapping("/{id}")
    public SkillGroup update(@PathVariable Long id, @Valid @RequestBody SkillGroupRequest req) {
        return skillGroupService.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        skillGroupService.delete(id);
    }
}

