package org.example.tourplannerbackend.Service.client;

import org.example.tourplannerbackend.DTO.openrouteservice.GeocodeSearchResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange(url = "https://api.openrouteservice.org")
public interface OpenRouteServiceClient {

  @GetExchange("/geocode/search")
  GeocodeSearchResponse geocodeSearch(
    @RequestParam(name = "api_key") String apiKey,
    @RequestParam String text
  );
}
