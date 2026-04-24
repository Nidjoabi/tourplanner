package org.example.tourplannerbackend.DTO.Out;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TourPublic {
  private String TourId;
  private String TourName;
  private String From;
  private String To;
  private String TransportationType;
  private int Distance;
  private int Duration;
  private String Description;
}
