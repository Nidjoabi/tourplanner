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
@RequestMapping("/tourlogs")
@AllArgsConstructor
public class TourlogController {
  private final TourlogMapper tourlogMapper;
  private final TourlogService tourlogService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TourlogPublic createTourlog(@RequestBody @Valid CreateTourlog tourlogIn, @AuthenticationPrincipal User currentUser) {

    Tourlog tourlog = tourlogService.createTourlog(tourlogIn, currentUser);
    return tourlogMapper.toObject(tourlog);

  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTourlog(@PathVariable UUID id,  @AuthenticationPrincipal User currentUser) {
    tourlogService.deleteTourlog(id, currentUser);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public TourlogPublic updateTourlog(@RequestBody @Valid UpdatedTourlog updatedTourlogIn, @PathVariable UUID id, @AuthenticationPrincipal User currentUser){
    Tourlog tourlog = tourlogService.updateTourlog(updatedTourlogIn, id, currentUser);
    return tourlogMapper.toObject(tourlog);

  }

  @GetMapping
  public List<TourlogPublic> readAllTourlogs() {
    return tourlogService.readAllTourlogs().stream().map(tourlogMapper::toListObject).toList();
  }

  @GetMapping("/{id}")
  public  TourlogPublic readTourlog(@PathVariable UUID id) {
    Tourlog tourlog = tourlogService.readById(id);
    return tourlogMapper.toObject(tourlog);
  }


}
