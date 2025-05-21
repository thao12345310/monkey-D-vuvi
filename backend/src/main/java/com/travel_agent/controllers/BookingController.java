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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
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

    @GetMapping("/admin/all-ship-bookings")
    public ResponseEntity<ResponseObject> getAllShipBookings() {
        try {
            List<BookingShipResponseDTO> bookings = bookingService.getAllShipBookings();
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("All ship bookings retrieved successfully")
                    .data(bookings)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to retrieve ship bookings: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }

    @GetMapping("/admin/all-hotel-bookings")
    public ResponseEntity<ResponseObject> getAllHotelBookings() {
        try {
            List<BookingHotelResponseDTO> bookings = bookingService.getAllHotelBookings();
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("All hotel bookings retrieved successfully")
                    .data(bookings)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to retrieve hotel bookings: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }

    @GetMapping("/ship/{shipId}")
    public ResponseEntity<ResponseObject> getShipBookingsByShipId(@PathVariable Integer shipId) {
        try {
            List<BookingShipResponseDTO> bookings = bookingService.getShipBookingsByShipId(shipId);
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Ship bookings retrieved successfully")
                    .data(bookings)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to retrieve ship bookings: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<ResponseObject> getHotelBookingsByHotelId(@PathVariable Integer hotelId) {
        try {
            List<BookingHotelResponseDTO> bookings = bookingService.getHotelBookingsByHotelId(hotelId);
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Hotel bookings retrieved successfully")
                    .data(bookings)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to retrieve hotel bookings: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<ResponseObject> updateBookingStatus(
            @PathVariable Integer bookingId,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            String note = request.get("note");
            
            if (status == null) {
                return ResponseEntity.badRequest().body(ResponseObject.builder()
                        .message("Status is required")
                        .responseCode(HttpStatus.BAD_REQUEST.value())
                        .build());
            }

            bookingService.updateBookingStatus(bookingId, status, note);
            
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Booking status updated successfully")
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseObject.builder()
                            .message("Failed to update booking status: " + e.getMessage())
                            .responseCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }
    }
}
