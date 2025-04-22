package com.travel_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class HotelDTO {
    private Integer hotelId;

    private String hotelName;

    private Integer totalRooms;

    private String companyName;

    private Integer hotelPrice;

    private String city;
    private String address;

    private String mapLink;
    private String thumbnail;

    private Integer companyId;

}
