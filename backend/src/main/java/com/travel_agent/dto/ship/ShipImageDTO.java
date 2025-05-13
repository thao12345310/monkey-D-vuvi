package com.travel_agent.dto.ship;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShipImageDTO {
    private Integer shipId;
    private String imgUrl;
}