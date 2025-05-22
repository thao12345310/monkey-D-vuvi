package com.travel_agent.controllers;

import com.travel_agent.annotation.CurrentUserId;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.booking.BookingRequestDTO;
import com.travel_agent.dto.booking.BookingResponseDTO;
import com.travel_agent.dto.booking.BookingHotelRequestDTO;
import com.travel_agent.dto.booking.BookingShipRequestDTO;
import com.travel_agent.dto.booking.BookingHotelResponseDTO;
import com.travel_agent.dto.booking.BookingShipResponseDTO;
import com.travel_agent.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseObject> createBooking(@CurrentUserId Integer userId,
            @RequestBody BookingRequestDTO request) {
        try {
            BookingResponseDTO booking = null;
            if (request instanceof BookingHotelRequestDTO hotelRequest) {   
                // handle hotel booking
                booking = bookingService.createHotelBooking(hotelRequest, userId);
            } else if (request instanceof BookingShipRequestDTO shipRequest) {
                // handle ship booking
                 booking = bookingService.createShipBooking(shipRequest, userId);
            } else {
                return ResponseEntity.badRequest().body(ResponseObject.builder()
                        .message("Invalid booking type")
                        .responseCode(HttpStatus.BAD_REQUEST.value())
                        .build());
            }

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ResponseObject.builder()
                            .message("Booking created successfully")
                            .data(booking)  
                            .responseCode(HttpStatus.CREATED.value())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to create booking: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }

    @GetMapping("/my-bookings/ship")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseObject> getMyShipBookings(
            @CurrentUserId Integer userId) {
        try {
            List<BookingShipResponseDTO> bookings = bookingService.getUserShipBookings(userId);
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Bookings retrieved successfully")
                    .data(bookings)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to retrieve bookings: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }

    @GetMapping("/my-bookings/hotel")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseObject> getMyHotelBookings(
            @CurrentUserId Integer userId) {
        try {
            List<BookingHotelResponseDTO> bookings = bookingService.getUserHotelBookings(userId);
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Bookings retrieved successfully")
                    .data(bookings)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to retrieve bookings: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }
}
