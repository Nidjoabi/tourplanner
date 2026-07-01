package org.example.tourplannerbackend.persistence;

import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Entity.Tourlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TourlogRepository extends JpaRepository<Tourlog, UUID> {

  List<Tourlog> findByTourId(UUID tourId);
  List<Tourlog> findByUserId(UUID userId);

}
