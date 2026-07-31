package com.rohitverma.portfolio.repository;

import com.rohitverma.portfolio.entity.EducationEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationEntryRepository extends JpaRepository<EducationEntry, Long> {
    List<EducationEntry> findAllByOrderByDisplayOrderAsc();
}
