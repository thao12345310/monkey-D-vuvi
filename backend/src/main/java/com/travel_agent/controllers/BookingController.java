package com.travel_agent.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travel_agent.dto.ResponseObject;
import com.travel_agent.services.BookingHotelRoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingHotelRoomService bookingHotelRoomService;

    // @GetMapping
    // public ResponseEntity<ResponseObject> getBookingHotelRoomByHotelId() {
    //     List<BookingHotelRoom> rooms = BookingHotelRoomService.getBookingHotelRoomByHotelId();
    // }
}
