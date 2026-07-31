package com.rohitverma.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "education_entries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String institution;

    private String degree;

    private String location;

    private String scoreLabel;

    private String startLabel;

    private String endLabel;

    @Builder.Default
    private Integer displayOrder = 0;
}
