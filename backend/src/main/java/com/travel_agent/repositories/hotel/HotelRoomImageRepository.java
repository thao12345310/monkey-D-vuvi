package com.travel_agent.repositories.hotel;

import com.travel_agent.models.entity.hotel.HotelRoomImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRoomImageRepository extends JpaRepository<HotelRoomImage, HotelRoomImage> {
    List<HotelRoomImage> findByRoomId(Integer hotelRoomId);
    void deleteByRoomId(Integer hotelRoomId);
}