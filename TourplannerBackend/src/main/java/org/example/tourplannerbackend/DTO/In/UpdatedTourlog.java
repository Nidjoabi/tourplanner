package org.example.tourplannerbackend.DTO.In;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.example.tourplannerbackend.Entity.Tourlog;

@Data
public class UpdatedTourlog {
  @NotBlank
  private String comment;
  @NotNull
  private Tourlog.Difficulty difficulty;
  private float totalTime;
  private float totalDistance;
  @Min(value = 1)
  @Max(value = 5)
  private int ratings;

}
