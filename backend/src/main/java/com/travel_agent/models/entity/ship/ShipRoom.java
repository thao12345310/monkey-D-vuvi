package com.travel_agent.models.entity.ship;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ship_room")
public class ShipRoom {
    @Id
    @Column(name = "ship_room_id")
    private Integer shipRoomId;

    @ManyToOne
    @JoinColumn(name = "ship_id")
    private Ship ship;

    @Column(name = "room_name")
    private String roomName;

    private Integer size;

    @Column(name = "max_persons")
    private Integer maxPersons;

    @Column(name = "room_price")
    private Integer roomPrice;

    @Column(name = "room_features")
    private String roomFeatures;
}
