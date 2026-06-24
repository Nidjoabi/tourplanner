package org.example.tourplannerbackend.config;

import org.example.tourplannerbackend.Service.client.OpenRouteServiceClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class WebClientConfig {

  @Bean
  public OpenRouteServiceClient openRouteServiceClient() {
    WebClient webClient = WebClient.builder()
      .baseUrl("https://api.openrouteservice.org")
      .build();

    HttpServiceProxyFactory factory = HttpServiceProxyFactory
      .builderFor(WebClientAdapter.create(webClient))
      .build();

    return factory.createClient(OpenRouteServiceClient.class);
  }
}
