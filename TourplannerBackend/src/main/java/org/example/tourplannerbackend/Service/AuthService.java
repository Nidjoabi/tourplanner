package org.example.tourplannerbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.tourplannerbackend.DTO.In.LoginRequest;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.persistence.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;


  public String login(LoginRequest loginRequest) {

    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
      loginRequest.getUsername(),
      loginRequest.getPassword())
    );

    User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
    return jwtService.generateToken(user);


  }
}
