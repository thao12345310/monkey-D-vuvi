package com.travel_agent.models.entity.hotel;

import com.travel_agent.models.id.HotelRoomFeatureId;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hotel_room_features")
@IdClass(HotelRoomFeatureId.class)
public class HotelRoomFeatures {
    @Column(name = "hotel_room_id")
    private Integer hotelRoomId;

    @Column(name = "room_features_id")
    private Integer roomFeaturesId;
}
