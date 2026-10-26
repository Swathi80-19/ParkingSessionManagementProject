package com.klef.soa.docker.repository;

import com.klef.soa.docker.entity.ParkingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingSessionRepository extends JpaRepository<ParkingSession, Long> {
}
