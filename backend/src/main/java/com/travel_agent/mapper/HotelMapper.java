package com.travel_agent.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.models.entity.hotel.Hotel;

@Mapper(componentModel = "spring")
public interface HotelMapper {
    @Mapping(source = "companyId.companyId", target = "companyId") // lấy ID từ Company
    HotelDTO hotelToHotelDTO(Hotel hotel);

    List<HotelDTO> hotelsToHotelDTOs(List<Hotel> hotels);
}
