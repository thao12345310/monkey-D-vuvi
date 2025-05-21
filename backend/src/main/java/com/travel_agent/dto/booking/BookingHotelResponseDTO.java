package com.travel_agent.dto.booking;

import java.util.List;

import com.travel_agent.dto.hotel.HotelDTO;
import com.travel_agent.dto.hotel.HotelRoomDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingHotelResponseDTO extends BookingResponseDTO {
    private HotelDTO hotel;
    private List<HotelRoomDTO> rooms;
}
