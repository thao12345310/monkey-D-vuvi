package com.travel_agent.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.ResultPaginationDTO;
import com.travel_agent.services.HotelService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/hotel")

public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public ResultPaginationDTO getAllHotels(
            @RequestParam("currentPage") Optional<Integer> currentPageOptional,
            @RequestParam("pageSize") Optional<Integer> pageSizeOptional
    ) {
        int currentPage = currentPageOptional.orElse(1);
        int pageSize = pageSizeOptional.orElse(10);

        Pageable pageable = PageRequest.of(currentPage - 1, pageSize);

        return hotelService.getAllHotels(pageable);
    }

    // View hotel details
    @GetMapping("/{hotelId}")
    public ResponseEntity<ResponseObject> getHotelDetails(@PathVariable("hotelId") Integer hotelId) {
        HotelDTO hotelDto = hotelService.getHotelDetails(hotelId);

        if (hotelDto != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Hotel details retrieved successfully")
                    .data(hotelDto)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Add hotel
    @PostMapping("/add")
    public ResponseEntity<ResponseObject> addHotel(@RequestBody HotelDTO hotelDto) {
        HotelDTO addedHotel = hotelService.addHotel(hotelDto);

        if (addedHotel != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Hotel added successfully")
                    .data(addedHotel)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update hotel
    @PutMapping("/{hotelId}")
    public ResponseEntity<ResponseObject> updateHotel(@PathVariable("hotelId") Integer hotelId, @RequestBody HotelDTO hotelDto) {
        HotelDTO updatedHotel = hotelService.updateHotel(hotelId, hotelDto);

        if (updatedHotel != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Hotel updated successfully")
                    .data(updatedHotel)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete hotel
    @DeleteMapping("/delete")
    public ResponseEntity<ResponseObject> deleteHotels(@RequestBody List<Integer> hotelIds) {
        if (hotelIds.size() > 10) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .message("Cannot delete more than 10 hotels at once")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }
        hotelService.deleteHotels(hotelIds);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Hotels deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
}
