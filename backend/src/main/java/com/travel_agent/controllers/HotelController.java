package com.travel_agent.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.services.HotelService;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/hotel")

public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public List<HotelDTO> getAllHotels(
        @RequestParam("currentPage") Optional<Integer> currentPageOptional,
        @RequestParam("pageSize") Optional<Integer> pageSizeOptional
    ) {
        int currentPage = currentPageOptional.orElse(1); // Mặc định là trang 1
    int pageSize = pageSizeOptional.orElse(10);      // Mặc định 10 phần tử mỗi trang
 
    Pageable pageable = PageRequest.of(currentPage - 1, pageSize);

    return hotelService.getAllHotels(pageable);
    }
}
