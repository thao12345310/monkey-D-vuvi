package com.travel_agent.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResponseObjectDTO {
    private int responseCode;
    private String message;
    private Object data;
}
