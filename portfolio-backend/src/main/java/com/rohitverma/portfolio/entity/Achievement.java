package com.rohitverma.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "achievements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String organization;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String dateLabel;

    private String link;

    private String icon;

    @Builder.Default
    private Integer displayOrder = 0;
}
