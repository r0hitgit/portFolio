package com.rohitverma.portfolio.config;

import com.rohitverma.portfolio.entity.*;
import com.rohitverma.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the admin user (from env vars) and initial resume-derived content on first boot.
 * Safe to run repeatedly — every check is "insert only if the table is empty / user is missing".
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final AchievementRepository achievementRepository;
    private final EducationEntryRepository educationEntryRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_USERNAME:admin}")
    private String adminUsername;

    @Value("${ADMIN_PASSWORD:changeme}")
    private String adminPassword;

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedEducation();
        seedProjects();
        seedAchievements();
    }

    private void seedAdminUser() {
        if (userRepository.findByUsername(adminUsername).isEmpty()) {
            User admin = User.builder()
                    .username(adminUsername)
                    .passwordHash(passwordEncoder.encode(adminPassword))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
        }
    }

    private void seedEducation() {
        if (educationEntryRepository.count() > 0) return;

        educationEntryRepository.saveAll(List.of(
                EducationEntry.builder()
                        .institution("Noida Institute of Engineering and Technology (NIET)")
                        .degree("B.Tech — Computer Science & Engineering (AI & ML)")
                        .location("Greater Noida")
                        .scoreLabel("7.7 CGPA")
                        .startLabel("Oct 2023")
                        .endLabel("May 2027")
                        .displayOrder(1)
                        .build(),
                EducationEntry.builder()
                        .institution("Saraswati Shishu Mandir Sr Sec School")
                        .degree("CBSE Class XII (AISSCE)")
                        .location("Gorakhpur")
                        .scoreLabel("72.4%")
                        .startLabel("2021")
                        .endLabel("2022")
                        .displayOrder(2)
                        .build(),
                EducationEntry.builder()
                        .institution("Saraswati Shishu Mandir Sr Sec School")
                        .degree("CBSE Class X (CCE)")
                        .location("Gorakhpur")
                        .scoreLabel("82.4%")
                        .startLabel("2019")
                        .endLabel("2020")
                        .displayOrder(3)
                        .build()
        ));
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) return;

        projectRepository.saveAll(List.of(
                Project.builder()
                        .title("NexHire")
                        .slug("nexhire")
                        .description("Full-stack job portal")
                        .bullets(List.of(
                                "Built and deployed a full-stack job portal at nexhire.me — Spring Boot REST API on Render, React/Vite frontend on Netlify, backed by Aiven-hosted MySQL.",
                                "JWT authentication with Spring Security: OTP email verification, forgot/reset password flow, async mail delivery via Brevo API to eliminate registration timeouts.",
                                "Resolved production challenges including CORS, SSL errors, and Dockerfile setup for containerised deployment. Integrated UptimeRobot for 99%+ uptime on free tier.",
                                "Layered architecture (Controller → Service → Repository) with Spring Data JPA, role-based endpoint security using @PreAuthorize and custom authority mapping."
                        ))
                        .techStack(List.of("Java", "Spring Boot", "Spring Security", "JWT", "React", "Vite", "MySQL", "Render", "Netlify", "Docker"))
                        .repoUrl("https://github.com/r0hitgit/NexHire")
                        .liveUrl("https://nexhire.me")
                        .featured(true)
                        .displayOrder(1)
                        .build(),
                Project.builder()
                        .title("Transaction Management GUI")
                        .slug("transaction-management-gui")
                        .description("Desktop banking transaction system")
                        .bullets(List.of(
                                "Designed a banking transaction system in Java simulating core account operations: create account, deposit, withdraw, and balance inquiry.",
                                "Built an interactive GUI using JavaFX applying OOP principles — inheritance used to model different account types (savings, current).",
                                "Fixed account-listing display bugs and ensured proper state management across multiple UI scenes."
                        ))
                        .techStack(List.of("Java", "JavaFX", "Eclipse IDE", "OOP"))
                        .featured(false)
                        .displayOrder(2)
                        .build()
        ));
    }

    private void seedAchievements() {
        if (achievementRepository.count() > 0) return;

        achievementRepository.saveAll(List.of(
                Achievement.builder()
                        .title("Dataverse Hackathon — Pre-Final Round")
                        .organization("NSUT, Delhi")
                        .description("Selected for the pre-final round of Dataverse Hackathon hosted at NSUT (Netaji Subhas University of Technology), Delhi — competing among multiple teams from various colleges.")
                        .dateLabel("Sep 2024")
                        .icon("🏆")
                        .displayOrder(1)
                        .build(),
                Achievement.builder()
                        .title("LeetCode — 120+ DSA Problems Solved")
                        .organization("leetcode.com/u/lifeaura")
                        .description("Solved 120+ problems spanning arrays, strings, searching and sorting algorithms across Easy and Medium difficulty levels.")
                        .dateLabel("Ongoing")
                        .icon("⚡")
                        .displayOrder(2)
                        .build()
        ));
    }
}
