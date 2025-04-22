package com.travel_agent.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.travel_agent.repositories.ShipRepository;

import lombok.RequiredArgsConstructor;

import com.travel_agent.dto.Meta;
import com.travel_agent.dto.ResultPaginationDTO;
import com.travel_agent.dto.ShipDTO;
import com.travel_agent.mapper.ShipMapper;
import com.travel_agent.models.entity.ship.Ship;

@Service
@RequiredArgsConstructor

public class ShipService {
    private final ShipRepository shipRepository;
    private final ShipMapper shipMapper;


    public ResultPaginationDTO getAllShips(Pageable pageable) {
        Page<Ship> pageShip= shipRepository.findAll(pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageShip.getNumber());
        mt.setPageSize(pageShip.getSize());
        mt.setPages(pageShip.getTotalPages());
        mt.setTotal(pageShip.getTotalElements());
        
        rs.setMeta((mt));
        rs.setResult(pageShip.getContent());
        return rs;
    }
}
