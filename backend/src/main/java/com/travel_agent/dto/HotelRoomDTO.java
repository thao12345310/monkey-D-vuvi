package com.travel_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HotelRoomDTO {
    private Integer roomId;
    private String roomName;
    private Integer roomPrice;
    private String roomFeatures;
    private Integer size;
    private Integer maxPersons;
    private String bedType;
    private String view;

//    private List<Integer> featureIds;
//    private List<String> features;
}