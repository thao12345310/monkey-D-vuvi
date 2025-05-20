package com.travel_agent.services;

import org.springframework.stereotype.Service;
import com.travel_agent.dto.BookingShipRoomDTO;
import com.travel_agent.dto.ResponseObject;

@Service
public class BookingShipRoomService {
    public ResponseObject createBooking(BookingShipRoomDTO bookingDTO) {
        // TODO: Implement booking logic
        return ResponseObject.builder()
                .message("Ship room booking created successfully")
                .responseCode(200)
                .data(bookingDTO)
                .build();
    }
} 