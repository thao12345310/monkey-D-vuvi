package com.travel_agent.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.hotel.BookingHotelRoomDTO;
import com.travel_agent.services.BookingHotelRoomService;
import com.travel_agent.services.BookingShipRoomService;
import com.travel_agent.dto.BookingShipRoomDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingHotelRoomService bookingHotelRoomService;
    private final BookingShipRoomService bookingShipRoomService;

    @PostMapping("/hotel")
    public ResponseEntity<ResponseObject> createHotelBooking(@RequestBody BookingHotelRoomDTO bookingDTO) {
        return ResponseEntity.ok(bookingHotelRoomService.createBooking(bookingDTO));
    }

    @PostMapping("/ship")
    public ResponseEntity<ResponseObject> createShipBooking(@RequestBody BookingShipRoomDTO bookingDTO) {
        return ResponseEntity.ok(bookingShipRoomService.createBooking(bookingDTO));
    }

    // @GetMapping
    // public ResponseEntity<ResponseObject> getBookingHotelRoomByHotelId() {
    //     List<BookingHotelRoom> rooms = BookingHotelRoomService.getBookingHotelRoomByHotelId();
    // }
}
