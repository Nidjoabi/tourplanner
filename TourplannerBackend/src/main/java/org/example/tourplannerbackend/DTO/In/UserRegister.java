package org.example.tourplannerbackend.DTO.In;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRegister {
  @NotBlank
  private String firstName;
  @NotBlank
  private String lastName;
  @NotBlank
  private String email;
  @NotBlank
  private String username;
  @NotBlank
  private String password;

  private String role = "user";



}
