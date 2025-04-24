package com.travel_agent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travel_agent.models.entity.ship.ShipEntity;

public interface ShipRepository extends JpaRepository<ShipEntity, Integer>{

}
