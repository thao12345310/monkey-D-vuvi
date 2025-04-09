package com.travel_agent.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_features")
public class RoomFeatures {
    @Id
    @Column(name = "room_features_id")
    private Integer roomFeaturesId;

    @Column(name = "room_features_description")
    private String roomFeaturesDescription;
}
