package org.example.tourplannerbackend.DTO.Out;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TourPublic {
  private String id;
  private String tourName;
  private String from;
  private String to;
  private String transportationType;
  private int distance;
  private int duration;
  private String description;
}
