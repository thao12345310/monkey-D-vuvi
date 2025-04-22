package com.travel_agent.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.dto.Meta;
import com.travel_agent.dto.ResultPaginationDTO;
import com.travel_agent.mapper.HotelMapper;
import com.travel_agent.models.entity.hotel.HotelEntity;
import com.travel_agent.repositories.HotelRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;

    public ResultPaginationDTO getAllHotels(Pageable pageable) {
        Page<HotelEntity> pageHotel= hotelRepository.findAll(pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageHotel.getNumber());
        mt.setPageSize(pageHotel.getSize());
        mt.setPages(pageHotel.getTotalPages());
        mt.setTotal(pageHotel.getTotalElements());
        
        rs.setMeta((mt));
        rs.setResult(pageHotel.getContent());
        return rs;
    }

    private HotelDTO convertToDto(HotelEntity hotelEntity) {
        HotelDTO hotelDto = new HotelDTO();
        hotelDto.setHotelId(hotelEntity.getHotelId());
        hotelDto.setHotelName(hotelEntity.getHotelName());
        hotelDto.setTotalRooms(hotelEntity.getTotalRooms());
        hotelDto.setCompanyName(hotelEntity.getCompanyName());
        hotelDto.setHotelPrice(hotelEntity.getHotelPrice());
        hotelDto.setCity(hotelEntity.getCity());
        hotelDto.setAddress(hotelEntity.getAddress());
        hotelDto.setMapLink(hotelEntity.getMapLink());
        hotelDto.setThumbnail(hotelEntity.getThumbnail());
        return hotelDto;
    }

    private HotelEntity convertToEntity(HotelDTO hotelDto) {
        HotelEntity hotelEntity = new HotelEntity();
        hotelEntity.setHotelId(hotelDto.getHotelId());
        hotelEntity.setHotelName(hotelDto.getHotelName());
        hotelEntity.setTotalRooms(hotelDto.getTotalRooms());
        hotelEntity.setCompanyName(hotelDto.getCompanyName());
        hotelEntity.setHotelPrice(hotelDto.getHotelPrice());
        hotelEntity.setCity(hotelDto.getCity());
        hotelEntity.setAddress(hotelDto.getAddress());
        hotelEntity.setMapLink(hotelDto.getMapLink());
        hotelEntity.setThumbnail(hotelDto.getThumbnail());
        return hotelEntity;
    }


    public HotelDTO getHotelDetails(Integer hotelId) {
        HotelEntity hotelEntity = hotelRepository.findById(Long.valueOf(hotelId))
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

        return convertToDto(hotelEntity);
    }

    public HotelDTO addHotel(HotelDTO hotelDto) {
        HotelEntity hotelEntity = convertToEntity(hotelDto);
        hotelEntity = new HotelEntity();
        hotelEntity.setHotelName(hotelDto.getHotelName());
        hotelEntity.setTotalRooms(hotelDto.getTotalRooms());
        hotelEntity.setCompanyName(hotelDto.getCompanyName());
        hotelEntity.setHotelPrice(hotelDto.getHotelPrice());
        hotelEntity.setCity(hotelDto.getCity());
        hotelEntity.setAddress(hotelDto.getAddress());
        hotelEntity.setMapLink(hotelDto.getMapLink());
        hotelEntity.setThumbnail(hotelDto.getThumbnail());
        hotelEntity = hotelRepository.save(hotelEntity);
        return convertToDto(hotelEntity);
    }


}
