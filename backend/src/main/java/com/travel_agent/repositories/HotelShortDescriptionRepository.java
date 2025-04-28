package com.travel_agent.repositories;

import com.travel_agent.models.entity.hotel.HotelShortDescriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelShortDescriptionRepository extends JpaRepository<HotelShortDescriptionEntity, Integer> {
    List<HotelShortDescriptionEntity> findByHotelId(Integer hotelId);
}