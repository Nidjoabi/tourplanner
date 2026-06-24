package org.example.tourplannerbackend.DTO.openrouteservice;

import lombok.Data;

@Data
public class Feature {
  private String type;
  private Geometry geometry;
}
