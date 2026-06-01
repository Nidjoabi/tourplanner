package org.example.tourplannerbackend.Controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.UserRegister;
import org.example.tourplannerbackend.DTO.Out.UserPrivate;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.Tourmapper;
import org.example.tourplannerbackend.Mapper.UserMapper;
import org.example.tourplannerbackend.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor

public class UserController {

  private final UserService userService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public void RegisterUser(@RequestBody @Valid UserRegister userIn){
    userService.RegisterUser(userIn);
  }
}
