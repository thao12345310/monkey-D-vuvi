package com.travel_agent.services;

import java.util.List;

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

    public List<HotelDTO> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        List<HotelDTO> hotelDTOs = hotelMapper.hotelsToHotelDTOs(hotels);
        return hotelDTOs;
    }
}
