package com.travel_agent.models.entity.hotel;

import com.travel_agent.models.entity.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking_hotel_room")
public class BookingHotelRoom {
    @Id
    @Column(name = "booking_room_id")
    private Integer bookingRoomId;

    @ManyToOne
    @JoinColumn(name = "hotel_room_id")
    private HotelRoomEntity hotelRoomEntity;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String state;
}