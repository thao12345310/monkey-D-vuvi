package com.travel_agent.repositories;

import com.travel_agent.models.entity.hotel.HotelImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelImageRepository extends JpaRepository<HotelImageEntity, Integer> {
    List<HotelImageEntity> findByHotelId(Integer hotelId);
}