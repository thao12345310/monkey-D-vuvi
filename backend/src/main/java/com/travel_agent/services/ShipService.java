package com.travel_agent.services;

import com.travel_agent.dto.ShipDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.travel_agent.repositories.ShipRepository;

import lombok.RequiredArgsConstructor;

import com.travel_agent.dto.Meta;
import com.travel_agent.dto.ResultPaginationDTO;
import com.travel_agent.mapper.ShipMapper;
import com.travel_agent.models.entity.ship.ShipEntity;
import com.travel_agent.models.entity.CompanyEntity;
import com.travel_agent.repositories.CompanyRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ShipService {
    private final ShipRepository shipRepository;
    private final ShipMapper shipMapper;
    private final CompanyRepository companyRepository;


    public ResultPaginationDTO getAllShips(Pageable pageable) {
        Page<ShipEntity> pageShip= shipRepository.findAll(pageable);
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

    public ShipDTO getShipDetails(Integer shipId) {
        ShipEntity shipEntity = shipRepository.findById(shipId)
                .orElseThrow(() -> new IllegalArgumentException("Ship not found with ID: " + shipId));

        return shipMapper.shipToShipDTO(shipEntity);
    }

    private void populateShipEntity(ShipEntity shipEntity, ShipDTO shipDto) {
        shipEntity.setShipName(shipDto.getShipName());
        shipEntity.setLaunch(shipDto.getLaunch());
        shipEntity.setCabin(shipDto.getCabin());
        shipEntity.setShell(shipDto.getShell());
        shipEntity.setTrip(shipDto.getTrip());
        shipEntity.setCompanyName(shipDto.getCompanyName());
        shipEntity.setShipPrice(shipDto.getShipPrice());
        shipEntity.setAddress(shipDto.getAddress());
        shipEntity.setMapLink(shipDto.getMapLink());
        shipEntity.setThumbnail(shipDto.getThumbnail());

        if (shipDto.getCompanyId() != null) {
            CompanyEntity company = companyRepository.findById(shipDto.getCompanyId())
                    .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + shipDto.getCompanyId()));
            shipEntity.setCompany(company);
        }
    }

    // Add ship
    public ShipDTO addShip(ShipDTO shipDto) {
        ShipEntity shipEntity = new ShipEntity();
        populateShipEntity(shipEntity, shipDto);
        shipEntity = shipRepository.save(shipEntity);
        return shipMapper.shipToShipDTO(shipEntity);
    }

    // Update ship
    public ShipDTO updateShip(Integer shipId, ShipDTO shipDto) {
        ShipEntity shipEntity = shipRepository.findById(shipId)
                .orElseThrow(() -> new IllegalArgumentException("Ship not found with ID: " + shipId));

        populateShipEntity(shipEntity, shipDto);
        shipEntity = shipRepository.save(shipEntity);
        return shipMapper.shipToShipDTO(shipEntity);
    }

    // Delete ships
    public void deleteShips(List<Integer> shipIds) {
        for (Integer shipId : shipIds) {
            ShipEntity shipEntity = shipRepository.findById(shipId)
                    .orElseThrow(() -> new IllegalArgumentException("Ship not found with ID: " + shipId));
            shipRepository.delete(shipEntity);
        }
    }
}
