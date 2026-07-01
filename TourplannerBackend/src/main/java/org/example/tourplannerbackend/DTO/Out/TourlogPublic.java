package org.example.tourplannerbackend.DTO.Out;

import lombok.Data;
import org.example.tourplannerbackend.Entity.Tourlog;

import java.time.LocalDate;

@Data
public class TourlogPublic {
  private String id;
  private String tourId;
  private LocalDate createdAt;
  private String comment;
  private Tourlog.Difficulty difficulty;
  private float totalTime;
  private float totalDistance;
  private int ratings;
  private boolean childFriendly;
}
