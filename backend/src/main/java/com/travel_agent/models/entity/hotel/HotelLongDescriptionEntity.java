package com.travel_agent.models.entity.hotel;

import com.travel_agent.models.id.HotelDescriptionId;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hotel_long_description")
@IdClass(HotelDescriptionId.class)
public class HotelLongDescriptionEntity {
    @Column(name = "hotel_id")
    private Integer hotelId;

    @Column(name = "block_id")
    private Integer blockId;

    private String type;
    private String data;
}

