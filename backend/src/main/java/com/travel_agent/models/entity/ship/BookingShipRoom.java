package com.travel_agent.models.entity.ship;

import java.time.LocalDate;

import com.travel_agent.models.entity.UserEntity;
import com.travel_agent.models.id.ship.BookingShipRoomId;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(BookingShipRoomId.class)
@Table(name = "booking_ship_room")
public class BookingShipRoom {
    @Id
    @Column(name = "booking_id")
    private Long bookingId;

    @Id
    @Column(name = "ship_room_id")
    private Long shipRoomId;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "booking_id", insertable = false, updatable = false)
    private BookingShipInfo bookingShipInfo;

    @ManyToOne
    @JoinColumn(name = "ship_room_id", insertable = false, updatable = false)
    private ShipRoomEntity shipRoom;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String state;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
}

