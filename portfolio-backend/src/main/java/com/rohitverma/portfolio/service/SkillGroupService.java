package com.rohitverma.portfolio.service;

import com.rohitverma.portfolio.dto.SkillGroupRequest;
import com.rohitverma.portfolio.entity.SkillGroup;
import com.rohitverma.portfolio.exception.ResourceNotFoundException;
import com.rohitverma.portfolio.repository.SkillGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillGroupService {

    private final SkillGroupRepository skillGroupRepository;

    public List<SkillGroup> findAll() {
        return skillGroupRepository.findAllByOrderByDisplayOrderAsc();
    }

    public SkillGroup create(SkillGroupRequest req) {
        SkillGroup group = SkillGroup.builder()
                .groupKey(req.group())
                .label(req.label())
                .items(req.items() != null ? new ArrayList<>(req.items()) : new ArrayList<>())
                .displayOrder(req.displayOrder() != null ? req.displayOrder() : 0)
                .build();
        return skillGroupRepository.save(group);
    }

    public SkillGroup update(Long id, SkillGroupRequest req) {
        SkillGroup group = skillGroupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill group not found: " + id));

        group.setGroupKey(req.group());
        group.setLabel(req.label());
        group.setItems(req.items() != null ? new ArrayList<>(req.items()) : new ArrayList<>());
        if (req.displayOrder() != null) group.setDisplayOrder(req.displayOrder());

        return skillGroupRepository.save(group);
    }

    public void delete(Long id) {
        if (!skillGroupRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill group not found: " + id);
        }
        skillGroupRepository.deleteById(id);
    }
}

