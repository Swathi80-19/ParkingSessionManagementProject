package com.klef.soa.docker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "parking_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Vehicle number is required")
    @Column(nullable = false)
    private String vehicleNumber;

    @NotBlank(message = "Entry time is required")
    @Column(nullable = false)
    private String entryTime;

    @NotNull(message = "Fee is required")
    @DecimalMin(value = "0.0", message = "Fee must be non-negative")
    @Column(nullable = false)
    private Double fee;

    @NotNull(message = "Payment status is required")
    @Column(nullable = false)
    private Boolean paid;
}
