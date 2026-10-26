package com.klef.soa.docker.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSessionResponse {

    private Long id;
    private String vehicleNumber;
    private String entryTime;
    private Double fee;
    private Boolean paid;
}
