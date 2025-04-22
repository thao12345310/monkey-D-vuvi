package com.travel_agent.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travel_agent.dto.ResultPaginationDTO;
import com.travel_agent.dto.ShipDTO;
import com.travel_agent.services.ShipService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ship")
public class ShipController {
    private final ShipService shipService;

    public ShipController(ShipService shipService) {
        this.shipService = shipService;
    }

    @GetMapping
    public ResultPaginationDTO getAllShips(
        @RequestParam("currentPage") Optional<Integer> currentPageOptional,
        @RequestParam("pageSize") Optional<Integer> pageSizeOptional
    ) {
        int currentPage = currentPageOptional.orElse(1); // Mặc định là trang 1
        int pageSize = pageSizeOptional.orElse(10);      // Mặc định 10 phần tử mỗi trang
 
    Pageable pageable = PageRequest.of(currentPage - 1, pageSize);

    return shipService.getAllShips(pageable);
    }
}
