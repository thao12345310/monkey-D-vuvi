package com.travel_agent.models.entity.ship;

import java.time.LocalDateTime;

import com.travel_agent.models.entity.UserEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking_ship_room")
public class BookingShipRoom {
    @Id
    @Column(name = "booking_room_id")
    private Integer bookingRoomId;

    @ManyToOne
    @JoinColumn(name = "ship_room_id")
    private ShipRoom shipRoom;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String state;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;
}
