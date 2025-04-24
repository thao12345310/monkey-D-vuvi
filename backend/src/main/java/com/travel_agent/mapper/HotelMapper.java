package com.travel_agent.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.models.entity.hotel.HotelEntity;

@Mapper(componentModel = "spring")
public interface HotelMapper {
    @Mapping(source = "companyId.companyId", target = "companyId") // lấy ID từ Company
    HotelDTO hotelToHotelDTO(HotelEntity hotel);

    List<HotelDTO> hotelsToHotelDTOs(List<HotelEntity> hotels);

    @Mapping(source = "companyId", target = "companyId.companyId")
    HotelEntity hotelDTOToHotel(HotelDTO dto);
}
