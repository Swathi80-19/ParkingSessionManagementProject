package com.klef.soa.docker.controller;

import com.klef.soa.docker.dto.ParkingSessionRequest;
import com.klef.soa.docker.dto.ParkingSessionResponse;
import com.klef.soa.docker.service.ParkingSessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parkingsession")
@RequiredArgsConstructor
@Tag(name = "Parking Session", description = "APIs for managing parking sessions")
public class ParkingSessionController {

    private final ParkingSessionService parkingSessionService;

    // ─── POST /parkingsession/add ─────────────────────────────────────────────

    @PostMapping("/add")
    @Operation(summary = "Add a new parking session", description = "Creates a new parking session record in the database")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Parking session created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<ParkingSessionResponse> addParkingSession(
            @Valid @RequestBody ParkingSessionRequest request) {
        ParkingSessionResponse response = parkingSessionService.addParkingSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ─── GET /parkingsession/dipsplayall ─────────────────────────────────────

    @GetMapping("/dipsplayall")
    @Operation(summary = "Display all parking sessions", description = "Retrieves all parking sessions from the database")
    @ApiResponse(responseCode = "200", description = "List of all parking sessions")
    public ResponseEntity<List<ParkingSessionResponse>> displayAllParkingSessions() {
        List<ParkingSessionResponse> sessions = parkingSessionService.displayAllParkingSessions();
        return ResponseEntity.ok(sessions);
    }

    // ─── GET /parkingsession/displayparkingsessionbyid/{id} ──────────────────

    @GetMapping("/displayparkingsessionbyid/{id}")
    @Operation(summary = "Display parking session by ID", description = "Retrieves a single parking session by its ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Parking session found"),
            @ApiResponse(responseCode = "404", description = "Parking session not found")
    })
    public ResponseEntity<ParkingSessionResponse> displayParkingSessionById(
            @Parameter(description = "ID of the parking session") @PathVariable Long id) {
        ParkingSessionResponse response = parkingSessionService.displayParkingSessionById(id);
        return ResponseEntity.ok(response);
    }

    // ─── DELETE /parkingsession/deleteparkingsessionbyid/{id} ────────────────

    @DeleteMapping("/deleteparkingsessionbyid/{id}")
    @Operation(summary = "Delete parking session by ID", description = "Deletes a parking session record by its ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Parking session deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Parking session not found")
    })
    public ResponseEntity<Void> deleteParkingSessionById(
            @Parameter(description = "ID of the parking session to delete") @PathVariable Long id) {
        parkingSessionService.deleteParkingSessionById(id);
        return ResponseEntity.noContent().build();
    }
}
