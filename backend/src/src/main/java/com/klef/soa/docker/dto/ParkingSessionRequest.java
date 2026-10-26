package com.klef.soa.docker.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSessionRequest {

    @NotBlank(message = "Vehicle number is required")
    private String vehicleNumber;

    @NotBlank(message = "Entry time is required")
    private String entryTime;

    @NotNull(message = "Fee is required")
    @DecimalMin(value = "0.0", message = "Fee must be non-negative")
    private Double fee;

    @NotNull(message = "Payment status is required")
    private Boolean paid;
}
