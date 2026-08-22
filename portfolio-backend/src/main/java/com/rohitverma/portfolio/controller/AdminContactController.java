package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.entity.ContactMessage;
import com.rohitverma.portfolio.exception.ResourceNotFoundException;
import com.rohitverma.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/messages")
@RequiredArgsConstructor
public class AdminContactController {

    private final ContactMessageRepository contactMessageRepository;

    @GetMapping
    public List<ContactMessage> findAll() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Message not found: " + id);
        }
        contactMessageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}