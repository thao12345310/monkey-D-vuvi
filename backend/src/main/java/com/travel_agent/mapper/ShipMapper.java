package com.travel_agent.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.travel_agent.dto.ship.ShipDTO;
import com.travel_agent.models.entity.ship.ShipEntity;

@Mapper(componentModel = "spring")
public interface ShipMapper {

    @Mapping(source = "company.companyId", target = "companyId")
    ShipDTO shipToShipDTO(ShipEntity ship);

    List<ShipDTO> shipsToShipDTOs(List<ShipEntity> ships);
}
