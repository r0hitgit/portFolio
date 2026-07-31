package com.rohitverma.portfolio.service;

import com.rohitverma.portfolio.dto.ContactRequest;
import com.rohitverma.portfolio.entity.ContactMessage;
import com.rohitverma.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final BrevoEmailService brevoEmailService;

    public ContactMessage submit(ContactRequest req) {
        boolean sent = brevoEmailService.sendContactNotification(req.name(), req.email(), req.message());

        ContactMessage saved = ContactMessage.builder()
                .name(req.name())
                .email(req.email())
                .message(req.message())
                .emailSent(sent)
                .build();

        return contactMessageRepository.save(saved);
    }
}
