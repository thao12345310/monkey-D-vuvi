package com.travel_agent.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.travel_agent.annotation.CurrentUserId;
import com.travel_agent.services.ChatbotService;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.ChatbotRequestDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatbotController {
    private final ChatbotService chatbotService;

    @PostMapping
    public ResponseEntity<ResponseObject> handleChatbotRequest(@CurrentUserId Integer userId, @RequestBody ChatbotRequestDTO request) {
        try {
            // Call the chatbot service to get a response
            String response = chatbotService.getResponse(userId,request.getMessage());
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Chatbot response")
                    .data(response)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseObject.builder()
                            .message("Failed to get chatbot response: " + e.getMessage())
                            .responseCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .build());
        }
    }
}
