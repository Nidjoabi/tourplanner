package org.example.tourplannerbackend.persistence;

import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Entity.Tourlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TourlogRepository extends JpaRepository<Tourlog, UUID> {
}
