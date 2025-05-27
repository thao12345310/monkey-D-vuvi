package com.travel_agent.dto.booking;

import com.travel_agent.models.entity.hotel.HotelEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingHotelRequestDTO extends BookingRequestDTO {
    private HotelEntity hotel;
}
