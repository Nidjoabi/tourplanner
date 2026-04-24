package org.example.tourplannerbackend.Service;


import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.persistence.TourRepository;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class TourService {

  private final TourRepository tourRepository;
  private final Tourmapper tourmapper;

  public Tour create(TourCreate tourIn) {
    Tour tour = tourmapper.toEntity(tourIn);

    return tourRepository.save(tour);
  }
}
