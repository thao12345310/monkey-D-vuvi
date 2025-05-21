package com.travel_agent.dto.booking;

import java.util.List;

import com.travel_agent.dto.ship.ShipDTO;
import com.travel_agent.dto.ship.ShipRoomDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingShipResponseDTO extends BookingResponseDTO {
    private ShipDTO ship;
    private List<ShipRoomDTO> rooms;
}
