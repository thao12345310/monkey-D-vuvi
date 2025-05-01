package com.travel_agent.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = false)
public class AccountDTO {
    private String accountId;
    private String username;
    private String password;
    private String role;
}
