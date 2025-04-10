package com.travel_agent.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShipDTO {
    private Integer shipId;
    private String shipName;
    private Integer launch;
    private Integer cabin;
    private String shell;
    private String trip;
    private String companyName;
    private Integer shipPrice;

    private String address;

    private String mapLink;
    private Integer companyId;
}
