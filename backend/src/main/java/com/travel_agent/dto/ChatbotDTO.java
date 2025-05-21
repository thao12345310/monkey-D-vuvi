package com.travel_agent.dto;

public class ChatbotDTO {
    private String message;

    public ChatbotDTO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
