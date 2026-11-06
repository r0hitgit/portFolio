package com.rohitverma.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skill_groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("group")
    @Column(name = "group_key", nullable = false)
    private String groupKey;

    @Column(nullable = false)
    private String label;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "skill_group_items", joinColumns = @JoinColumn(name = "skill_group_id"))
    @Column(name = "item")
    @Builder.Default
    private List<String> items = new ArrayList<>();

    @Builder.Default
    private Integer displayOrder = 0;
}

