package com.travel_agent.models.entity.ship;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking_ship_info")
public class BookingShipInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Integer bookingId;

    @Column(name = "ship_id")
    private Integer shipId;

    @Column(name = "user_id")
    private Integer userId;
    
    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "adults")
    private Integer adults;
    
    @Column(name = "children")
    private Integer children;

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "state")
    private String state;
}
