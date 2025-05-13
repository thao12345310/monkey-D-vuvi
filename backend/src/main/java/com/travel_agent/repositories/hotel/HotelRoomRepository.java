package com.travel_agent.repositories.hotel;

import com.travel_agent.models.entity.hotel.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRoomRepository extends JpaRepository<HotelRoom, Integer> {
    List<HotelRoom> findByHotel_HotelId(Integer hotelId);
}