package com.travel_agent.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.mapper.HotelMapper;
import com.travel_agent.models.entity.hotel.Hotel;
import com.travel_agent.repositories.HotelRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;

    public List<HotelDTO> getAllHotels(Pageable pageable) {
        Page<Hotel> pageHotel= hotelRepository.findAll(pageable);
        List<Hotel> hotels = pageHotel.getContent();
        List<HotelDTO> hotelDTOs = hotelMapper.hotelsToHotelDTOs(hotels);
        return hotelDTOs;
    }
}
