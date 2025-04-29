package com.travel_agent.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "account")
public class AccountEntity {
    @Id
    @Column(name = "account_id")
    private String accountId;

    private String username;
    private String password;
    private String role;

    @PrePersist
    public void generateId() {
        if (this.accountId == null || this.accountId.isEmpty()) {
            String hash = hashFields(username, password, role);
            this.accountId = role + "_" + hash;
        }
    }

    private String hashFields(String username, String password, String role) {
        try {
            String input = username + ":" + password + ":" + role;
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            // Get first 8 characters for brevity
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 8 && i < hashBytes.length; i++) {
                sb.append(String.format("%02x", hashBytes[i]));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating hash for accountId", e);
        }
    }
}
