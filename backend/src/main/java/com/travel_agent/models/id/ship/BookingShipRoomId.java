package com.travel_agent.models.id.ship;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingShipRoomId implements Serializable {
    private Long bookingId;
    private Long shipRoomId;
} 