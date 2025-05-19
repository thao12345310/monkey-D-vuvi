package com.travel_agent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travel_agent.models.entity.hotel.BookingHotelRoom;

public interface BookingHotelRoomRepository extends JpaRepository<BookingHotelRoom, Integer> {

}
