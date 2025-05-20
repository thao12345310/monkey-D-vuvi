package com.travel_agent.dto.hotel;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookingHotelRoomDTO {
    private Integer userId;
    private Integer hotelId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer adults;
    private Integer children;
    private List<RoomBookingDetail> roomBookings;
    private Integer state;
    private Integer totalAmount;

    @Data
    public static class RoomBookingDetail {
        private Long hotelRoomId;
        private Integer quantity;
        private Integer roomPrice;
    }
} 