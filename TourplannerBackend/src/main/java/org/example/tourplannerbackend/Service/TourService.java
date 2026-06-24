package org.example.tourplannerbackend.Service;


import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.service.Coordinates;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.persistence.TourRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class TourService {

  private final TourRepository tourRepository;
  private final Tourmapper tourmapper;
  private final GeoService geoService;

  public Tour create(TourCreate tourIn) {
    Tour tour = tourmapper.toEntity(tourIn);

    User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    tour.setUser(currentUser);

    Coordinates fromCoordinates = geoService.findCoordinates(tour.getFrom())
      .orElseThrow(IllegalArgumentException::new);

    Coordinates toCoordinates = geoService.findCoordinates(tour.getTo())
      .orElseThrow(IllegalArgumentException::new);

    tour.setFromCoordinates(fromCoordinates.toString());
    tour.setToCoordinates(toCoordinates.toString());

    return tourRepository.save(tour);
  }
}
