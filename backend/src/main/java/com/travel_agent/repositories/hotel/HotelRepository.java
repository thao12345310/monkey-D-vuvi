package com.travel_agent.repositories.hotel;

import com.travel_agent.models.entity.hotel.HotelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<HotelEntity, Integer> {
    @Query("SELECT h FROM HotelEntity h WHERE " +
            "(:name IS NULL OR LOWER(h.hotelName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:minPrice IS NULL OR h.hotelPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR h.hotelPrice <= :maxPrice)")
    List<HotelEntity> findByHotelNameAndPriceRange(
            @Param("name") String name,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice);
}