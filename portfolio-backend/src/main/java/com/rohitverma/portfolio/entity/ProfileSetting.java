package com.rohitverma.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "profile_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileSetting {

    @Id
    @Column(name = "setting_key", nullable = false, unique = true)
    private String key;

    @Column(name = "setting_value", columnDefinition = "TEXT")
    private String value;
}

