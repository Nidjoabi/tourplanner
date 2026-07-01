package org.example.tourplannerbackend.Controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.CreateTourlog;
import org.example.tourplannerbackend.DTO.In.UpdatedTourlog;
import org.example.tourplannerbackend.DTO.Out.TourlogPublic;
import org.example.tourplannerbackend.Entity.Tourlog;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.TourlogMapper;
import org.example.tourplannerbackend.Service.TourlogService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class TourlogController {
  private final TourlogMapper tourlogMapper;
  private final TourlogService tourlogService;

  @PostMapping("/tours/{tourId}/tourlogs")
  @ResponseStatus(HttpStatus.CREATED)
  public TourlogPublic createTourlog(@PathVariable UUID tourId, @RequestBody @Valid CreateTourlog tourlogIn, @AuthenticationPrincipal User currentUser) {

    Tourlog tourlog = tourlogService.createTourlog(tourId, tourlogIn, currentUser);
    return tourlogMapper.toObject(tourlog);

  }

  @DeleteMapping("/tours/{tourId}/tourlogs/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTourlog(@PathVariable UUID tourId, @PathVariable UUID id, @AuthenticationPrincipal User currentUser) {
    tourlogService.deleteTourlog(tourId, id, currentUser);
  }

  @PutMapping("/tours/{tourId}/tourlogs/{id}")
  @ResponseStatus(HttpStatus.OK)
  public TourlogPublic updateTourlog(@PathVariable UUID tourId, @RequestBody @Valid UpdatedTourlog updatedTourlogIn, @PathVariable UUID id, @AuthenticationPrincipal User currentUser){
    Tourlog tourlog = tourlogService.updateTourlog(tourId, updatedTourlogIn, id, currentUser);
    return tourlogMapper.toObject(tourlog);

  }

  // Alle Logs für DIESE TOUR, von allen Usern
  @GetMapping("/tours/{tourId}/tourlogs")
  public List<TourlogPublic> readAllTourlogs(@PathVariable UUID tourId) {
    return tourlogService.readAllTourlogs(tourId).stream().map(tourlogMapper::toListObject).toList();
  }

  @GetMapping("/tours/{tourId}/tourlogs/{id}")
  public  TourlogPublic readTourlog(@PathVariable UUID tourId, @PathVariable UUID id, @AuthenticationPrincipal User currentUser) {
    Tourlog tourlog = tourlogService.readById(tourId, id, currentUser);
    return tourlogMapper.toObject(tourlog);
  }

  // Alle Logs DES EINGELOGGTEN USERS, über alle Touren hinweg
  @GetMapping("/tourlogs")
  public List<TourlogPublic> readMyTourlogs(@AuthenticationPrincipal User currentUser) {
    return tourlogService.readMyTourlogs(currentUser).stream().map(tourlogMapper::toListObject).toList();
  }

}
