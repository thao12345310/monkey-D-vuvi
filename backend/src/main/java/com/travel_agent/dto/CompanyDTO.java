package com.travel_agent.dto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@JsonIgnoreProperties(ignoreUnknown = false)
public class CompanyDTO {
    private Integer companyId;
    private AccountDTO account;
    private String companyName;
}
