package com.travel_agent.models.entity.ship;

import com.travel_agent.models.id.ShipRoomFeatureId;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ship_room_features")
@IdClass(ShipRoomFeatureId.class)
public class ShipRoomFeatures {
    @Id
    @Column(name = "ship_room_id")
    private Integer shipRoomId;

    @Id
    @Column(name = "room_features_id")
    private Integer roomFeaturesId;
}