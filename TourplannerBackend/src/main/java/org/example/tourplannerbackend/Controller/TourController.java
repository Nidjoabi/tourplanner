package org.example.tourplannerbackend.Controller;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.In.UpdatedTour;
import org.example.tourplannerbackend.DTO.Out.TourPublic;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.Service.TourService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tours")
@AllArgsConstructor
public class TourController {

  private final Tourmapper tourmapper;
  private final TourService tourService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TourPublic createTour(@RequestBody @Valid TourCreate tourIn, @AuthenticationPrincipal User currentUser) {
    Tour tour = tourService.create(tourIn, currentUser);
    return tourmapper.toObject(tour);
  }


  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTour(@PathVariable UUID id, @AuthenticationPrincipal User currentUser) {
    tourService.deleteTour(id, currentUser);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public TourPublic updateTour(@RequestBody @Valid UpdatedTour updatedTour, @PathVariable UUID id, @AuthenticationPrincipal User currentUser) {
    Tour tour = tourService.updateTour(updatedTour, id, currentUser);
    return tourmapper.toObject(tour);
  }

  @GetMapping
  public List<TourPublic> readAllTours() {
    return tourService.readAllTours().stream().map(tourmapper::toListObject).toList();
  }

  @GetMapping("/{id}")
  public TourPublic readTour(@PathVariable UUID id) {
    Tour tour = tourService.readTourById(id);
    return tourmapper.toObject(tour);
  }
}
