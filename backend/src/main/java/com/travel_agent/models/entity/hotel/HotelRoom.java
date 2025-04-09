package com.travel_agent.models.entity.hotel;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hotel_room")
public class HotelRoom {
    @Id
    @Column(name = "hotel_room_id")
    private Integer hotelRoomId;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "room_price")
    private Integer roomPrice;

    @Column(name = "room_features")
    private String roomFeatures;

    private Integer size;

    @Column(name = "max_persons")
    private Integer maxPersons;

    @Column(name = "bed_type")
    private String bedType;

    private String view;
}
