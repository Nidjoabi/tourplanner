package org.example.tourplannerbackend.Service;


import lombok.AllArgsConstructor;
import org.example.tourplannerbackend.DTO.In.UserRegister;
import org.example.tourplannerbackend.Entity.User;
import org.example.tourplannerbackend.Mapper.UserMapper;
import org.example.tourplannerbackend.persistence.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

  private final UserMapper userMapper;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public void RegisterUser(UserRegister userIn){
    User user = userMapper.toEntity(userIn);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);
  }
}
