package com.travel_agent.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.travel_agent.repositories.ShipRepository;

import lombok.RequiredArgsConstructor;

import com.travel_agent.dto.ShipDTO;
import com.travel_agent.mapper.ShipMapper;
import com.travel_agent.models.entity.ship.Ship;

@Service
@RequiredArgsConstructor

public class ShipService {
    private final ShipRepository shipRepository;
    private final ShipMapper shipMapper;


    public List<ShipDTO> getAllShips() {
        List<Ship> ships = shipRepository.findAll();
        List<ShipDTO> shipDTOs = shipMapper.shipsToShipDTOs(ships);
        return shipDTOs;
    }
}
