package com.travel_agent.repositories;

import com.travel_agent.models.entity.hotel.HotelFeatureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelFeatureRepository extends JpaRepository<HotelFeatureEntity, Integer> {
    List<HotelFeatureEntity> findByHotelId(Integer hotelId);
}