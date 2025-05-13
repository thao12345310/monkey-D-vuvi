package com.travel_agent.repositories.ship;

import com.travel_agent.models.entity.ship.ShipEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipRepository extends JpaRepository<ShipEntity, Integer> {
}