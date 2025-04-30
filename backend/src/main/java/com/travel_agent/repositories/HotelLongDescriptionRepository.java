package com.travel_agent.repositories;

import com.travel_agent.models.entity.hotel.HotelLongDescriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import com.travel_agent.models.id.HotelDescriptionId;
import java.util.List;

public interface HotelLongDescriptionRepository extends JpaRepository<HotelLongDescriptionEntity, HotelDescriptionId> {
    List<HotelLongDescriptionEntity> findByHotelId(Integer hotelId);
}