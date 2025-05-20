package com.travel_agent.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingHotelRoomDTO {
    private Long hotelRoomId;
    private Long userId;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private Integer numberOfGuests;
    private String specialRequests;
} 