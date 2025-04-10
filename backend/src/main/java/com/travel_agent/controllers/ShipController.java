package com.travel_agent.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travel_agent.dto.ShipDTO;
import com.travel_agent.services.ShipService;

@RestController
@RequestMapping("/api/ship")
public class ShipController {
    private final ShipService shipService;

    public ShipController(ShipService shipService) {
        this.shipService = shipService;
    }

    @GetMapping
    public List<ShipDTO> getAllShips() {
        return shipService.getAllShips();
    }
}
