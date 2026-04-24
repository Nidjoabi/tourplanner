package org.example.tourplannerbackend.DTO.In;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TourCreate {
  @NotBlank
  private String TourName;
  @NotBlank
  private String From;
  @NotBlank
  private String To;
  @NotBlank
  private String TransportationType;
  @NotNull
  @Min(0)
  private int Distance;
  @NotNull
  @Min(0)
  private int Duration;
  @NotBlank
  private String Description;
}
