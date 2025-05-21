package com.travel_agent.services;

import org.springframework.stereotype.Service;

import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.hotel.BookingHotelRoomDTO;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingHotelRoomService {
    public ResponseObject createBooking(BookingHotelRoomDTO bookingDTO) {
        // TODO: Implement booking logic
        // 1. Validate booking data
        // 2. Check room availability
        // 3. Create booking_hotel_info record
        // 4. Create booking_hotel_room records for each room type
        
        List<String> bookingDetails = new ArrayList<>();
        bookingDetails.add(String.format("Hotel ID: %d", bookingDTO.getHotelId()));
        bookingDetails.add(String.format("Total guests: %d adults, %d children", 
            bookingDTO.getAdults(), 
            bookingDTO.getChildren()));
        
        for (BookingHotelRoomDTO.RoomBookingDetail roomBooking : bookingDTO.getRoomBookings()) {
            bookingDetails.add(String.format("Booked %d room(s) of type %d", 
                roomBooking.getQuantity(), 
                roomBooking.getHotelRoomId()));
        }

        return ResponseObject.builder()
                .message("Hotel rooms booking created successfully")
                .responseCode(200)
                .data(bookingDetails)
                .build();
    }
}
