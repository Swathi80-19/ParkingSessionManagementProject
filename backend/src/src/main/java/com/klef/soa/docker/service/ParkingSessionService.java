package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.ParkingSessionRequest;
import com.klef.soa.docker.dto.ParkingSessionResponse;

import java.util.List;

public interface ParkingSessionService {

    ParkingSessionResponse addParkingSession(ParkingSessionRequest request);

    List<ParkingSessionResponse> displayAllParkingSessions();

    ParkingSessionResponse displayParkingSessionById(Long id);

    void deleteParkingSessionById(Long id);
}
