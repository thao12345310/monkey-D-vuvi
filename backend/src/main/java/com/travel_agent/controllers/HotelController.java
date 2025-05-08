package com.travel_agent.controllers;

import java.util.List;
import java.util.Optional;

import com.travel_agent.dto.HotelRoomDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.dto.ResponseObjectDTO;
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
    public ResponseEntity<ResponseObjectDTO> getHotelDetails(@PathVariable("hotelId") Integer hotelId) {
        HotelDTO hotelDto = hotelService.getHotelDetails(hotelId);

        if (hotelDto != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
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
    public ResponseEntity<ResponseObjectDTO> addHotel(@RequestBody HotelDTO hotelDto) {
        HotelDTO addedHotel = hotelService.addHotel(hotelDto);

        if (addedHotel != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
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
    public ResponseEntity<ResponseObjectDTO> updateHotel(@PathVariable("hotelId") Integer hotelId, @RequestBody HotelDTO hotelDto) {
        HotelDTO updatedHotel = hotelService.updateHotel(hotelId, hotelDto);

        if (updatedHotel != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
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
    public ResponseEntity<ResponseObjectDTO> deleteHotels(@RequestBody List<Integer> hotelIds) {
        if (hotelIds.size() > 10) {
            return ResponseEntity.badRequest().body(ResponseObjectDTO.builder()
                    .message("Cannot delete more than 10 hotels at once")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }
        hotelService.deleteHotels(hotelIds);
        return ResponseEntity.ok(ResponseObjectDTO.builder()
                .message("Hotels deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    // Add room to hotel
    @PostMapping("/{hotelId}/add-room")
    public ResponseEntity<ResponseObjectDTO> addHotelRoom(@PathVariable("hotelId") Integer hotelId, @RequestBody HotelRoomDTO roomDto) {
        HotelRoomDTO addedRoom = hotelService.addHotelRoom(hotelId, roomDto);

        if (addedRoom != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
                    .message("Room added successfully")
                    .data(addedRoom)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update room in hotel
    @PutMapping("/{hotelId}/update-room/{roomId}")
    public ResponseEntity<ResponseObjectDTO> updateHotelRoom(
            @PathVariable("hotelId") Integer hotelId,
            @PathVariable("roomId") Integer roomId,
            @RequestBody HotelRoomDTO roomDto) {
        HotelRoomDTO updatedRoom = hotelService.updateHotelRoom(hotelId, roomId, roomDto);

        if (updatedRoom != null) {
            return ResponseEntity.ok(ResponseObjectDTO.builder()
                    .message("Room updated successfully")
                    .data(updatedRoom)
                    .responseCode(HttpStatus.OK.value())
                    .build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete room from hotel
    @DeleteMapping("/{hotelId}/delete-room")
    public ResponseEntity<ResponseObjectDTO> deleteHotelRooms(
            @PathVariable("hotelId") Integer hotelId,
            @RequestBody List<Integer> roomIds) {
        if (roomIds.size() > 10) {
            return ResponseEntity.badRequest().body(ResponseObjectDTO.builder()
                    .message("Cannot delete more than 10 rooms at once")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }
        hotelService.deleteHotelRooms(hotelId, roomIds);
        return ResponseEntity.ok(ResponseObjectDTO.builder()
                .message("Rooms deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
}
