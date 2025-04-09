package com.travel_agent.models.entity.ship;

import com.travel_agent.models.entity.Company;

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
@Table(name = "ship")
public class Ship {
    @Id
    @Column(name = "ship_id")
    private Integer shipId;

    @Column(name = "ship_name")
    private String shipName;

    private Integer launch;
    private Integer cabin;
    private String shell;
    private String trip;
    private String admin;

    @Column(name = "ship_price")
    private Integer shipPrice;

    private String address;

    @Column(name = "map_link")
    private String mapLink;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company_id;
}
