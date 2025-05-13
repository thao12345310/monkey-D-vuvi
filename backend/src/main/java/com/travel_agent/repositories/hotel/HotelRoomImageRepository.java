package com.travel_agent.repositories.hotel;

import com.travel_agent.models.entity.hotel.HotelRoomImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRoomImageRepository extends JpaRepository<HotelRoomImageEntity, HotelRoomImageEntity> {
    List<HotelRoomImageEntity> findByRoomId(Integer hotelRoomId);
    void deleteByRoomId(Integer hotelRoomId);
}