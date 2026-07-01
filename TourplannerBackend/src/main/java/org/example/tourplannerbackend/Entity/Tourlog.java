package org.example.tourplannerbackend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tourlogs")
@Getter
@Setter
@NoArgsConstructor
public class Tourlog {

  public enum Difficulty { EASY, MEDIUM, HARD }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  private LocalDate createdAt;
  private LocalDate updatedAt;
  private String comment;
  private Difficulty difficulty;
  private float totalDistance;
  private float totalTime;
  @Min(value = 1)
  @Max(value = 5)
  private int ratings;
  private boolean childFriendly;

  @ManyToOne
  @JoinColumn(name = "tour_id", nullable = false)
  private Tour tour;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;


}
