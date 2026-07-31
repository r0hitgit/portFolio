package com.rohitverma.portfolio.controller;

import com.rohitverma.portfolio.dto.LoginRequest;
import com.rohitverma.portfolio.dto.LoginResponse;
import com.rohitverma.portfolio.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
