package org.example.tourplannerbackend.DTO.openrouteservice;

import lombok.Data;

import java.util.List;

@Data
public class Geometry {
  private String type;
  private List<Double> coordinates;
}
