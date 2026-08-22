package com.rohitverma.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

/**
 * Thin wrapper around Brevo's transactional email API (v3/smtp/email).
 * Reuses the same approach as NexHire's async email delivery.
 */
@Service
public class BrevoEmailService {

    private static final Logger log = LoggerFactory.getLogger(BrevoEmailService.class);
    private static final String BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

    @Value("${app.brevo.api-key}")
    private String apiKey;

    @Value("${app.brevo.sender-email}")
    private String senderEmail;

    @Value("${app.brevo.sender-name}")
    private String senderName;

    @Value("${app.contact.notify-email}")
    private String notifyEmail;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean sendContactNotification(String fromName, String fromEmail, String message) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("BREVO_API_KEY is not set — skipping email notification for contact message from {}", fromEmail);
            return false;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        Map<String, Object> body = Map.of(
                "sender", Map.of("name", senderName, "email", senderEmail),
                "to", List.of(Map.of("email", notifyEmail)),
                "replyTo", Map.of("email", fromEmail, "name", fromName),
                "subject", "New portfolio contact message from " + fromName,
                "htmlContent", "<p><strong>From:</strong> " + fromName + " (" + fromEmail + ")</p>"
                        + "<p>" + message.replace("\n", "<br/>") + "</p>"
        );

        try {
            restTemplate.postForEntity(BREVO_ENDPOINT, new HttpEntity<>(body, headers), String.class);
            log.info("Brevo notification email sent successfully for contact message from {}", fromEmail);
            return true;
        } catch (Exception ex) {
            log.error("Failed to send Brevo notification email: {}", ex.getMessage(), ex);
            return false;
        }
    }
}