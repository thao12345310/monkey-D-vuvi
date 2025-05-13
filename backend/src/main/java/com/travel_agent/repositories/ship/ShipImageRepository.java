package com.travel_agent.repositories.ship;

import com.travel_agent.models.entity.ship.ShipImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipImageRepository extends JpaRepository<ShipImageEntity, Integer> {
    List<ShipImageEntity> findByShipId(Integer shipId);
}