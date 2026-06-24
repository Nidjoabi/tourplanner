package org.example.tourplannerbackend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.example.tourplannerbackend.DTO.openrouteservice.GeocodeSearchResponse;
import org.example.tourplannerbackend.DTO.openrouteservice.Geometry;
import org.example.tourplannerbackend.DTO.service.Coordinates;
import org.example.tourplannerbackend.Service.client.OpenRouteServiceClient;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GeoService {

  private final String openRouteServiceApiKey;
  private final OpenRouteServiceClient openRouteServiceClient;

  public GeoService(
    @Value("${openrouteservice.api-key}") String openRouteServiceApiKey,
    OpenRouteServiceClient openRouteServiceClient
  ) {
    this.openRouteServiceApiKey = openRouteServiceApiKey;
    this.openRouteServiceClient = openRouteServiceClient;
  }

  public Optional<Coordinates> findCoordinates(String query) {
    GeocodeSearchResponse geocodeSearchResponse = openRouteServiceClient.geocodeSearch(openRouteServiceApiKey, query);

    if (geocodeSearchResponse.getFeatures().isEmpty()) {
      return Optional.empty();
    }

    Geometry geometry = geocodeSearchResponse.getFeatures().getFirst().getGeometry();
    Coordinates coordinates = new Coordinates(
      geometry.getCoordinates().getLast(),
      geometry.getCoordinates().getFirst()
    );

    return Optional.of(coordinates);
  }
}
