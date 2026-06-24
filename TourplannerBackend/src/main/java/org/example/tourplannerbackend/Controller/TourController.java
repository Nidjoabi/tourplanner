package org.example.tourplannerbackend.Controller;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.In.UpdatedTour;
import org.example.tourplannerbackend.DTO.Out.TourPublic;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.Service.TourService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

@RestController
@RequestMapping("/tour")
@AllArgsConstructor
public class TourController {

  private final Tourmapper tourmapper;
  private final TourService tourService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TourPublic createTour(@RequestBody @Valid TourCreate tourIn) {
    Tour tour = tourService.create(tourIn);
    return tourmapper.toObject(tour);
  }


  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTour(@PathVariable UUID id) {
    tourService.deleteTour(id);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public TourPublic updateTour(@RequestBody @Valid UpdatedTour updatedTour, @PathVariable UUID id) {
    Tour tour = tourService.updateTour(updatedTour, id);
    return tourmapper.toObject(tour);
  }
}
