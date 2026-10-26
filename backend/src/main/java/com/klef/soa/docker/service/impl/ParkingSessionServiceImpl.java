package com.klef.soa.docker.service.impl;

import com.klef.soa.docker.dto.ParkingSessionRequest;
import com.klef.soa.docker.dto.ParkingSessionResponse;
import com.klef.soa.docker.entity.ParkingSession;
import com.klef.soa.docker.repository.ParkingSessionRepository;
import com.klef.soa.docker.service.ParkingSessionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParkingSessionServiceImpl implements ParkingSessionService {

    private final ParkingSessionRepository parkingSessionRepository;

    @Override
    public ParkingSessionResponse addParkingSession(ParkingSessionRequest request) {
        ParkingSession session = ParkingSession.builder()
                .vehicleNumber(request.getVehicleNumber())
                .entryTime(request.getEntryTime())
                .fee(request.getFee())
                .paid(request.getPaid())
                .build();

        ParkingSession saved = parkingSessionRepository.save(session);
        return mapToResponse(saved);
    }

    @Override
    public List<ParkingSessionResponse> displayAllParkingSessions() {
        return parkingSessionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ParkingSessionResponse displayParkingSessionById(Long id) {
        ParkingSession session = parkingSessionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Parking session not found with ID: " + id));
        return mapToResponse(session);
    }

    @Override
    public void deleteParkingSessionById(Long id) {
        if (!parkingSessionRepository.existsById(id)) {
            throw new EntityNotFoundException(
                    "Parking session not found with ID: " + id);
        }
        parkingSessionRepository.deleteById(id);
    }

    // ─── Mapper ──────────────────────────────────────────────────────────────

    private ParkingSessionResponse mapToResponse(ParkingSession session) {
        return ParkingSessionResponse.builder()
                .id(session.getId())
                .vehicleNumber(session.getVehicleNumber())
                .entryTime(session.getEntryTime())
                .fee(session.getFee())
                .paid(session.getPaid())
                .build();
    }
}
