package com.travel_agent.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@Setter
@Data
@JsonIgnoreProperties(ignoreUnknown = false)
public class UserDTO {
    private Integer userId;
    private AccountDTO account; // AccountDTO để chứa thông tin AccountEntity
    private LocalDate dob;
}
