package com.rohitverma.portfolio.service;

import com.rohitverma.portfolio.dto.EducationRequest;
import com.rohitverma.portfolio.entity.EducationEntry;
import com.rohitverma.portfolio.exception.ResourceNotFoundException;
import com.rohitverma.portfolio.repository.EducationEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationEntryRepository educationEntryRepository;

    public List<EducationEntry> findAll() {
        return educationEntryRepository.findAllByOrderByDisplayOrderAsc();
    }

    public EducationEntry create(EducationRequest req) {
        EducationEntry entry = EducationEntry.builder()
                .institution(req.institution())
                .degree(req.degree())
                .location(req.location())
                .scoreLabel(req.scoreLabel())
                .startLabel(req.startLabel())
                .endLabel(req.endLabel())
                .displayOrder(req.displayOrder() != null ? req.displayOrder() : 0)
                .build();
        return educationEntryRepository.save(entry);
    }

    public EducationEntry update(Long id, EducationRequest req) {
        EducationEntry entry = educationEntryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education entry not found: " + id));

        entry.setInstitution(req.institution());
        entry.setDegree(req.degree());
        entry.setLocation(req.location());
        entry.setScoreLabel(req.scoreLabel());
        entry.setStartLabel(req.startLabel());
        entry.setEndLabel(req.endLabel());
        if (req.displayOrder() != null) entry.setDisplayOrder(req.displayOrder());

        return educationEntryRepository.save(entry);
    }

    public void delete(Long id) {
        if (!educationEntryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education entry not found: " + id);
        }
        educationEntryRepository.deleteById(id);
    }
}
