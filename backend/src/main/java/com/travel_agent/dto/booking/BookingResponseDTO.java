package com.travel_agent.dto.booking;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Data
@Getter
@Setter

public class BookingResponseDTO {
    private Integer bookingId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer adults;
    private Integer children;
    private String specialRequest;
    private String state;
} 