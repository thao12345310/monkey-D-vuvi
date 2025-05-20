package com.travel_agent.repositories.hotel;

import com.travel_agent.models.entity.hotel.BookingHotelInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingHotelInfoRepository extends JpaRepository<BookingHotelInfo, Long> {
} 