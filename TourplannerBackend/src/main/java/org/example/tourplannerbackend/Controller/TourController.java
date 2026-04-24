package org.example.tourplannerbackend.Controller;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.Out.TourPublic;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.Service.TourService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tour")
@AllArgsConstructor
public class TourController {

  private final Tourmapper tourmapper;
  private final TourService tourService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TourPublic createTour(@RequestBody @Valid TourCreate tourIn){
    Tour tour = tourService.create(tourIn);
    return tourmapper.toObject(tour);
  }
}
