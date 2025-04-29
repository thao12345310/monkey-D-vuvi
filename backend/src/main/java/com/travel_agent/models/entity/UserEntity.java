package com.travel_agent.models.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "\"user\"")
public class UserEntity {
    @Id
    @Column (name = "user_id")
    private Integer userId;

    @Id
    @OneToOne
    @JoinColumn (name = "account_id")
    private AccountEntity account;

    @Column(name = "dob")
    private LocalDateTime dob;
}
