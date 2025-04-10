package com.travel_agent.repositories;

import com.travel_agent.models.entity.hotel.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long>{
    
}
