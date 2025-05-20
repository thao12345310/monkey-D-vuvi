package com.travel_agent.repositories.hotel;

import com.travel_agent.models.entity.hotel.BookingHotelRoom;
import com.travel_agent.models.id.hotel.BookingHotelRoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingHotelRoomRepository extends JpaRepository<BookingHotelRoom, BookingHotelRoomId> {
} 