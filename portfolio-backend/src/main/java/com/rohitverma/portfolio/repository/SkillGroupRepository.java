package com.rohitverma.portfolio.repository;

import com.rohitverma.portfolio.entity.SkillGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillGroupRepository extends JpaRepository<SkillGroup, Long> {

    List<SkillGroup> findAllByOrderByDisplayOrderAsc();

    Optional<SkillGroup> findByGroupKey(String groupKey);
}

