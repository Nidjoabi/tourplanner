package org.example.tourplannerbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.tourplannerbackend.DTO.In.CreateTourlog;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.In.UpdatedTourlog;
import org.example.tourplannerbackend.DTO.Out.TourlogPublic;
import org.example.tourplannerbackend.Entity.Tour;
import org.example.tourplannerbackend.Entity.Tourlog;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.TourlogMapper;
import org.example.tourplannerbackend.persistence.TourRepository;
import org.example.tourplannerbackend.persistence.TourlogRepository;
import org.example.tourplannerbackend.persistence.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TourlogService {

  private final TourlogMapper tourlogMapper;
  private final TourlogRepository tourlogRepository;
  private final TourRepository tourRepository;

  public Tourlog createTourlog(CreateTourlog tourIn, User currentUser) {
    Tourlog tourlog = tourlogMapper.toEntity(tourIn);

    Tour tour = tourRepository.findById(tourIn.getTourId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tour not found"));

    tourlog.setTour(tour);
    tourlog.setUser(currentUser);
    tourlog.setCreatedAt(LocalDate.now());

    return tourlogRepository.save(tourlog);
  }

  public void deleteTourlog(UUID tourlogId, User currentUser) {
    Tourlog tourlog = tourlogRepository.findById(tourlogId)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tourlog not found"));

    if (!tourlog.getUser().getId().equals(currentUser.getId())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this tourlog");
    }

    tourlogRepository.deleteById(tourlogId);
  }

  public Tourlog updateTourlog(UpdatedTourlog updatedTourlogIn, UUID tourlogId, User currentUser) {
    Tourlog tourlog = tourlogRepository.findById(tourlogId)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tourlog not found"));

    if (!tourlog.getUser().getId().equals(currentUser.getId())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update this tourlog");
    }

    tourlog.setComment(updatedTourlogIn.getComment());
    tourlog.setDifficulty(updatedTourlogIn.getDifficulty());
    tourlog.setTotalDistance(updatedTourlogIn.getTotalDistance());
    tourlog.setTotalTime(updatedTourlogIn.getTotalTime());
    tourlog.setRatings(updatedTourlogIn.getRatings());
    tourlog.setUpdatedAt(LocalDate.now());

    return tourlogRepository.save(tourlog);
  }

  public List<Tourlog> readAllTourlogs() {
    return tourlogRepository.findAll();
  }

  public Tourlog readById(UUID tourlogId) {

    return tourlogRepository.findById(tourlogId)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tourlog not found"));
  }

}
