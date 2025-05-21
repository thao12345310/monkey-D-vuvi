package com.travel_agent.models.entity.hotel;

import com.travel_agent.models.entity.UserEntity;
import com.travel_agent.models.id.hotel.BookingHotelRoomId;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(BookingHotelRoomId.class)
@Table(name = "booking_hotel_room")
public class BookingHotelRoom {
    @Id
    @Column(name = "booking_id")
    private Long bookingId;

    @Id
    @Column(name = "hotel_room_id")
    private Long hotelRoomId;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "booking_id", insertable = false, updatable = false)
    private BookingHotelInfo bookingHotelInfo;

    @ManyToOne
    @JoinColumn(name = "hotel_room_id", insertable = false, updatable = false)
    private HotelRoomEntity hotelRoom;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String state;
}

