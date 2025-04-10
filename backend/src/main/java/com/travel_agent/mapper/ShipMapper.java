package com.travel_agent.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.travel_agent.dto.ShipDTO;
import com.travel_agent.models.entity.ship.Ship;

@Mapper(componentModel = "spring")
public interface ShipMapper {

    @Mapping(source = "companyId.companyId", target = "companyId")
    ShipDTO shipToShipDTO(Ship ship);

    List<ShipDTO> shipsToShipDTOs(List<Ship> ships);
}
