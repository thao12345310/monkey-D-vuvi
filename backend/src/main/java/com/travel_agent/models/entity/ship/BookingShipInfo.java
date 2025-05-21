package com.travel_agent.models.entity.ship;

import com.travel_agent.models.entity.UserEntity;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
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
    private Long bookingId;

    @Column(name = "ship_id")
    private Long shipId;

    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "adults")
    private Integer adults;
    
    @Column(name = "children")
    private Integer children;

    @Column(name = "state")
    private Integer state;

    @Column(name = "total_amount")
    private Integer totalAmount;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "ship_id", insertable = false, updatable = false)
    private ShipEntity ship;
}
