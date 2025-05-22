package com.travel_agent.controllers;

import com.travel_agent.dto.ship.ShipDTO;
import com.travel_agent.dto.ship.ShipRoomDTO;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.ResultPaginationDTO;
import com.travel_agent.services.ShipService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchShipsByNamePriceAndTrip(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "minPrice", required = false) Integer minPrice,
            @RequestParam(value = "maxPrice", required = false) Integer maxPrice,
            @RequestParam(value = "trip", required = false) String trip,
            @RequestParam(value = "features", required = false) String features,
            @RequestParam(value = "currentPage", defaultValue = "1") int currentPage,
            @RequestParam(value = "pageSize", defaultValue = "6") int pageSize) {
        
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize);
        ResultPaginationDTO result = shipService.searchShipsByNamePriceAndTrip(name, minPrice, maxPrice, trip, features, pageable);

        return ResponseEntity.ok(ResponseObject.builder()
                .message("Ships retrieved successfully")
                .data(result)
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping("/{shipId}")
    public ResponseEntity<ResponseObject> getShipDetails(@PathVariable("shipId") Integer shipId) {
        ShipDTO shipDto = shipService.getShipDetails(shipId);

        if (shipDto != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Ship details retrieved successfully")
                    .data(shipDto)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // View all rooms
    @GetMapping("/{shipId}/rooms")
    public ResponseEntity<ResponseObject> getAllRoomsByShipId(@PathVariable("shipId") Integer shipId) {
        List<ShipRoomDTO> rooms = shipService.getAllRoomsByShipId(shipId);

        if (rooms != null && !rooms.isEmpty()) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Rooms retrieved successfully")
                    .data(rooms)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("No rooms found for this ship")
                    .data(rooms)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ResponseObject> addShip(@RequestBody ShipDTO shipDto) {
        ShipDTO addedShip = shipService.addShip(shipDto);

        if (addedShip != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Ship added successfully")
                    .data(addedShip)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{shipId}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ResponseObject> updateShip(@PathVariable("shipId") Integer shipId, @RequestBody ShipDTO shipDto) {
        ShipDTO updatedShip = shipService.updateShip(shipId, shipDto);

        if (updatedShip != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Ship updated successfully")
                    .data(updatedShip)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ResponseObject> deleteShips(@RequestBody List<Integer> shipIds) {
        if (shipIds.size() > 10) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .message("Cannot delete more than 10 ships at once")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }
        shipService.deleteShips(shipIds);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Ships deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    // View room
    @GetMapping("/{shipId}/{roomId}")
    public ResponseEntity<ResponseObject> getShipRoom(
            @PathVariable("shipId") Integer shipId,
            @PathVariable("roomId") Integer roomId) {
        ShipRoomDTO roomDto = shipService.getShipRoom(shipId, roomId);

        if (roomDto != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Room details retrieved successfully")
                    .data(roomDto)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Add room
    @PostMapping("/{shipId}/add-room")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ResponseObject> addShipRoom(@PathVariable("shipId") Integer shipId, @RequestBody ShipRoomDTO roomDto) {
        ShipRoomDTO addedRoom = shipService.addShipRoom(shipId, roomDto);

        if (addedRoom != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Room added successfully")
                    .data(addedRoom)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update room
    @PutMapping("/{shipId}/{roomId}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ResponseObject> updateShipRoom(
            @PathVariable("shipId") Integer shipId,
            @PathVariable("roomId") Integer roomId,
            @RequestBody ShipRoomDTO roomDto) {
        ShipRoomDTO updatedRoom = shipService.updateShipRoom(shipId, roomId, roomDto);

        if (updatedRoom != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Room updated successfully")
                    .data(updatedRoom)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete room
    @DeleteMapping("/{shipId}/delete-room")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ResponseObject> deleteShipRooms(
            @PathVariable("shipId") Integer shipId,
            @RequestBody List<Integer> roomIds) {
        if (roomIds.size() > 10) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .message("Cannot delete more than 10 rooms at once")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }
        shipService.deleteShipRooms(shipId, roomIds);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Rooms deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping("/suggest")
    public ResponseEntity<ResponseObject> suggestShipNames(@RequestParam("q") String keyword) {
        List<String> names = shipService.suggestShipNames(keyword);
        return ResponseEntity.ok(ResponseObject.builder()
            .message("Hotel names suggestion")
            .data(names)
            .responseCode(HttpStatus.OK.value())
            .build());
    }

    @GetMapping("/features")
    public ResponseEntity<ResponseObject> getAllFeatures() {
        List<String> features = shipService.getAllFeatures();
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Features retrieved successfully")
                .data(features)
                .responseCode(HttpStatus.OK.value())
                .build());
    }
}