package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.dto.EducationRequest;
import com.rohitverma.portfolio.entity.EducationEntry;
import com.rohitverma.portfolio.service.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/education")
@RequiredArgsConstructor
public class AdminEducationController {

    private final EducationService educationService;

    @PostMapping
    public ResponseEntity<EducationEntry> create(@Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(educationService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationEntry> update(@PathVariable Long id, @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(educationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        educationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
