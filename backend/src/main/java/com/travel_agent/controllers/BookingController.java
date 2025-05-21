package com.travel_agent.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.travel_agent.dto.ResponseObject;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {

    // private final BookingHotelRoomService bookingHotelRoomService;
    // private final BookingShipRoomService bookingShipRoomService;

    // @PostMapping("/hotel")
    // public ResponseEntity<ResponseObject> createHotelBooking(@RequestBody BookingHotelInfoDTO bookingDTO) {
    //     return ResponseEntity.ok(bookingHotelRoomService.createBooking(bookingDTO));
    // }

    // @PostMapping("/ship")
    // public ResponseEntity<ResponseObject> createShipBooking(@RequestBody BookingShipInfoDTO bookingDTO) {
    //     return ResponseEntity.ok(bookingShipRoomService.createBooking(bookingDTO));
    // }

    // @GetMapping
    // public ResponseEntity<ResponseObject> getBookingHotelRoomByHotelId() {
    //     List<BookingHotelRoom> rooms = BookingHotelRoomService.getBookingHotelRoomByHotelId();
    // }
}
