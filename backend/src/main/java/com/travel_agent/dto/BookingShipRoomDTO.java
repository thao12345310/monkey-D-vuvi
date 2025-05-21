package com.travel_agent.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingShipRoomDTO {
    private Long shipRoomId;
    private Long userId;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private Integer numberOfPassengers;
    private String specialRequests;
} 