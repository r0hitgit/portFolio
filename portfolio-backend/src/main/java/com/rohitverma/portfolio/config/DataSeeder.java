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
    private final SkillGroupRepository skillGroupRepository;
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
        seedSkills();
        cleanupAchievementEmojis();
    }

    private void seedAdminUser() {
        var existing = userRepository.findByUsername(adminUsername);
        if (existing.isEmpty()) {
            User admin = User.builder()
                    .username(adminUsername)
                    .passwordHash(passwordEncoder.encode(adminPassword))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
        } else if (adminPassword != null && !adminPassword.isBlank()) {
            User admin = existing.get();
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
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
                        .scoreLabel("")
                        .startLabel("2021")
                        .endLabel("2022")
                        .displayOrder(2)
                        .build(),
                EducationEntry.builder()
                        .institution("Saraswati Shishu Mandir Sr Sec School")
                        .degree("CBSE Class X (CCE)")
                        .location("Gorakhpur")
                        .scoreLabel("")
                        .startLabel("2019")
                        .endLabel("2020")
                        .displayOrder(3)
                        .build()
        ));
    }

    private void seedProjects() {
        projectRepository.findBySlug("transaction-management-gui").ifPresent(projectRepository::delete);

        if (projectRepository.findBySlug("nexhire").isEmpty()) {
            projectRepository.save(
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
                        .build()
            );
        }

        if (projectRepository.findBySlug("genericmeds-ai").isEmpty()) {
            projectRepository.save(
                Project.builder()
                        .title("GenericMeds AI")
                        .slug("genericmeds-ai")
                        .description("Open-source platform for verified generic medicine discovery and price transparency")
                        .bullets(List.of(
                                "Built and deployed an open-source platform for verified generic medicine discovery and price transparency at genericmeds-ai.vercel.app.",
                                "Matches branded prescriptions to verified PMBI generic alternatives by active pharmaceutical ingredients (APIs), strength, and release type, benchmarked against PMBI & NPPA ceiling rates.",
                                "Indexes 10,000+ PMBJP Kendras across India with distance-based locator tools, plus a bilingual (English/Hindi) assistant powered by Google Gemini 1.5 Flash with clinical guardrails.",
                                "Architected serverless SQLite on Vercel via a FastAPI cold-start routine cloning into ephemeral /tmp partition, achieving sub-100ms queries without hosted DB costs; compliant with India's DPDP Act 2023."
                        ))
                        .techStack(List.of("React", "Vite", "Python", "FastAPI", "SQLAlchemy", "SQLite", "Gemini API", "Vercel"))
                        .repoUrl("https://github.com/r0hitgit/genericmeds-ai")
                        .liveUrl("https://genericmeds-ai.vercel.app")
                        .featured(true)
                        .displayOrder(2)
                        .build()
            );
        }
    }

    private void seedAchievements() {
        if (achievementRepository.count() > 0) return;

        achievementRepository.saveAll(List.of(
                Achievement.builder()
                        .title("Dataverse Hackathon — Pre-Final Round")
                        .organization("NSUT, Delhi")
                        .description("Selected for the pre-final round of Dataverse Hackathon hosted at NSUT (Netaji Subhas University of Technology), Delhi — competing among multiple teams from various colleges.")
                        .dateLabel("Sep 2024")
                        .icon(null)
                        .displayOrder(1)
                        .build(),
                Achievement.builder()
                        .title("LeetCode — 250+ DSA Problems Solved")
                        .organization("leetcode.com/u/lifeaura")
                        .description("Solved 250+ problems spanning arrays, strings, searching, sorting and linkedlist algorithms across Easy and Medium difficulty levels.")
                        .dateLabel("Ongoing")
                        .icon(null)
                        .displayOrder(2)
                        .build()
        ));
    }

    private void seedSkills() {
        if (skillGroupRepository.count() > 0) return;

        skillGroupRepository.saveAll(List.of(
                SkillGroup.builder()
                        .groupKey("languages")
                        .label("languages")
                        .items(List.of("Java", "Python", "JavaScript", "C/C++"))
                        .displayOrder(1)
                        .build(),
                SkillGroup.builder()
                        .groupKey("frameworks")
                        .label("frameworks_libraries")
                        .items(List.of("Spring Boot", "Spring Security", "FastAPI", "React", "Vite", "Tailwind CSS", "REST API"))
                        .displayOrder(2)
                        .build(),
                SkillGroup.builder()
                        .groupKey("databases")
                        .label("databases")
                        .items(List.of("PostgreSQL", "MySQL", "SQLite", "MongoDB"))
                        .displayOrder(3)
                        .build(),
                SkillGroup.builder()
                        .groupKey("tools")
                        .label("developer_tools")
                        .items(List.of("VS Code", "IntelliJ IDEA", "Eclipse", "Postman", "Git", "GitHub", "Docker"))
                        .displayOrder(4)
                        .build(),
                SkillGroup.builder()
                        .groupKey("cloud")
                        .label("cloud_devops")
                        .items(List.of("Render", "Netlify", "Vercel", "Neon"))
                        .displayOrder(5)
                        .build()
        ));
    }

    private void cleanupAchievementEmojis() {
        List<Achievement> all = achievementRepository.findAll();
        boolean changed = false;
        for (Achievement a : all) {
            if (a.getIcon() != null) {
                String sanitized = a.getIcon().replaceAll("[\\x{10000}-\\x{10ffff}\\u2600-\\u27bf\\u2300-\\u23ff]", "").trim();
                if (!sanitized.equals(a.getIcon())) {
                    a.setIcon(sanitized.isEmpty() ? null : sanitized);
                    changed = true;
                }
            }
        }
        if (changed) {
            achievementRepository.saveAll(all);
        }
    }
}
