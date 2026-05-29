package org.example.tourplannerbackend.DTO.In;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TourCreate {
  @NotBlank
  private String tourName;
  @NotBlank
  private String from;
  @NotBlank
  private String to;
  @NotBlank
  private String transportationType;
  @NotNull
  @Min(0)
  private int distance;
  @NotNull
  @Min(0)
  private int duration;
  @NotBlank
  private String description;
}
