package org.example.tourplannerbackend.auth;

import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.LoginRequest;
import org.example.tourplannerbackend.Service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
@RequestMapping("/auth")
@RestController
@AllArgsConstructor
class AuthController {

  private final AuthService authService;

  @PostMapping
  @ResponseStatus(HttpStatus.ACCEPTED)
  public String login(@Validated @RequestBody LoginRequest loginRequest) {
    return authService.login(loginRequest);
  }



}
