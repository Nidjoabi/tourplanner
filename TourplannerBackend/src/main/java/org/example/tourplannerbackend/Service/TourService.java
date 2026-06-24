package org.example.tourplannerbackend.Service;


import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.In.UpdatedTour;
import org.example.tourplannerbackend.DTO.service.Coordinates;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.persistence.TourRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import java.util.UUID;


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

  public void deleteTour(UUID tourId) {
    belongsToCurrentUser(tourId);

    tourRepository.deleteById(tourId);
  }

  private void belongsToCurrentUser(UUID tourId) {
    User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    assert currentUser != null;
    UUID currentUserId = currentUser.getId();

    Tour tour = tourRepository.findById(tourId)
      .orElseThrow(IllegalArgumentException::new);

    if(!tour.getUser().getId().equals(currentUserId)){
      throw new AccessDeniedException("This tour does not belong to you!");
    }
  }

  public Tour updateTour(UpdatedTour updatedTour, UUID id) {

    belongsToCurrentUser(id);

    Tour tour = tourRepository.findById(id)
      .orElseThrow(IllegalArgumentException::new);

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
