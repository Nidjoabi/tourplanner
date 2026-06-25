package org.example.tourplannerbackend.Service;


import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.In.UpdatedTour;
import org.example.tourplannerbackend.DTO.service.Coordinates;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.persistence.TourRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;


@Service
@AllArgsConstructor
public class TourService {

  private final TourRepository tourRepository;
  private final Tourmapper tourmapper;
  private final GeoService geoService;

  public Tour create(TourCreate tourIn, User currentUser) {
    Tour tour = tourmapper.toEntity(tourIn);
    tour.setUser(currentUser);

    Coordinates fromCoordinates = geoService.findCoordinates(tour.getFrom())
      .orElseThrow(IllegalArgumentException::new);

    Coordinates toCoordinates = geoService.findCoordinates(tour.getTo())
      .orElseThrow(IllegalArgumentException::new);

    tour.setFromCoordinates(fromCoordinates.toString());
    tour.setToCoordinates(toCoordinates.toString());

    return tourRepository.save(tour);
  }

  public void deleteTour(UUID tourId, User currentUser) {
    Tour tour = tourRepository.findById(tourId)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tour not found"));
    if(!tour.getUser().getId().equals(currentUser.getId())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this tour");
    }
    tourRepository.deleteById(tourId);
  }

  public Tour updateTour(UpdatedTour updatedTour, UUID tourId,  User currentUser) {

    Tour tour = tourRepository.findById(tourId)
      .orElseThrow(()  -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tour not found"));
    if(!tour.getUser().getId().equals(currentUser.getId())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update this tour");
    }

    tour.setTourName(updatedTour.getTourName());
    tour.setTransportationType(updatedTour.getTransportationType());
    tour.setDistance(updatedTour.getDistance());
    tour.setDuration(updatedTour.getDuration());
    tour.setDescription(updatedTour.getDescription());

    if (!updatedTour.getFrom().equals(tour.getFrom()) || !updatedTour.getTo().equals(tour.getTo())) {
      Coordinates fromCoordinates = geoService.findCoordinates(updatedTour.getFrom())
        .orElseThrow(IllegalArgumentException::new);
      Coordinates toCoordinates = geoService.findCoordinates(updatedTour.getTo())
        .orElseThrow(IllegalArgumentException::new);

      tour.setFromCoordinates(fromCoordinates.toString());
      tour.setToCoordinates(toCoordinates.toString());
    }
    tour.setFrom(updatedTour.getFrom());
    tour.setTo(updatedTour.getTo());


    return tourRepository.save(tour);
  }

}
