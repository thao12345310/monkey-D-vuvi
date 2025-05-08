package com.travel_agent.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.travel_agent.dto.ShipDTO;
import com.travel_agent.dto.ResponseObjectDTO;
import com.travel_agent.dto.ResultPaginationDTO;
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
        int currentPage = currentPageOptional.orElse(1);
        int pageSize = pageSizeOptional.orElse(10);

        Pageable pageable = PageRequest.of(currentPage - 1, pageSize);

        return shipService.getAllShips(pageable);
    }

    // View ship details
    @GetMapping("/{shipId}")
    public ResponseEntity<ResponseObjectDTO> getShipDetails(@PathVariable("shipId") Integer shipId) {
        ShipDTO shipDto = shipService.getShipDetails(shipId);

        if (shipDto != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
                    .message("Ship details retrieved successfully")
                    .data(shipDto)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Add ship
    @PostMapping("/add")
    public ResponseEntity<ResponseObjectDTO> addShip(@RequestBody ShipDTO shipDto) {
        ShipDTO addedShip = shipService.addShip(shipDto);

        if (addedShip != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
                    .message("Ship added successfully")
                    .data(addedShip)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update ship
    @PutMapping("/{shipId}")
    public ResponseEntity<ResponseObjectDTO> updateShip(@PathVariable("shipId") Integer shipId, @RequestBody ShipDTO shipDto) {
        ShipDTO updatedShip = shipService.updateShip(shipId, shipDto);

        if (updatedShip != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
                    .message("Ship updated successfully")
                    .data(updatedShip)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete ships
    @DeleteMapping("/delete")
    public ResponseEntity<ResponseObjectDTO> deleteShips(@RequestBody List<Integer> shipIds) {
        if (shipIds.size() > 10) {
            return ResponseEntity.badRequest().body(ResponseObjectDTO.builder()
                    .message("Cannot delete more than 10 ships at once")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }
        shipService.deleteShips(shipIds);
        return ResponseEntity.ok(ResponseObjectDTO.builder()
                .message("Ships deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
}