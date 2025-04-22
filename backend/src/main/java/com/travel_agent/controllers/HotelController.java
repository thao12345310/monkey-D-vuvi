package com.travel_agent.controllers;

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
        int currentPage = currentPageOptional.orElse(1); // Mặc định là trang 1
        int pageSize = pageSizeOptional.orElse(10);      // Mặc định 10 phần tử mỗi trang
 
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

}
