package com.travel_agent.controllers;

import com.travel_agent.dto.LoginRequest;
import com.travel_agent.dto.LoginResponse;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.services.AuthService;
import com.travel_agent.services.UserService;

import lombok.RequiredArgsConstructor;

import com.travel_agent.services.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final CompanyService companyService;
    private final PasswordEncoder passwordEncoder;


    @PostMapping("/login/user")
    public ResponseEntity<ResponseObject> loginUser(@RequestBody LoginRequest request) {
        try {
            var user = userService.findByUsername(request.getUsername());
            System.out.println(user);
            // Kiểm tra password bằng passwordEncoder.matches()
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder()
                    .message("Invalid password")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
            }
            
            String token = authService.generateToken(user.getUsername(), user.getRole());
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("User logged in successfully")
                    .data(new LoginResponse(token, user.getRole(), user.getUsername()))
                    .responseCode(HttpStatus.OK.value())
                    .build());
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseObject.builder()
                    .message("Invalid username or password")
                    .responseCode(HttpStatus.UNAUTHORIZED.value())
                    .build());
        }
    }

    @PostMapping("/login/company")
    public ResponseEntity<ResponseObject> loginCompany(@RequestBody LoginRequest request) {
        try {
            var company = companyService.findByUsername(request.getUsername());
            
            // Kiểm tra password bằng passwordEncoder.matches()
            if (!passwordEncoder.matches(request.getPassword(), company.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder()
                    .message("Invalid password")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
            }
            
            String token = authService.generateToken(company.getUsername(), company.getRole());
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Company logged in successfully")
                    .data(new LoginResponse(token, company.getRole(), company.getUsername()))
                    .responseCode(HttpStatus.OK.value())
                    .build());
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseObject.builder()
                    .message("Invalid username or password")
                    .responseCode(HttpStatus.UNAUTHORIZED.value())
                    .build());
        }
    }
} 