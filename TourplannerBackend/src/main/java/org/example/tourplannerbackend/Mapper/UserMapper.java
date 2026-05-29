package org.example.tourplannerbackend.Mapper;

import org.example.tourplannerbackend.DTO.In.UserRegister;
import org.example.tourplannerbackend.DTO.Out.UserPrivate;
import org.example.tourplannerbackend.Entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

  User toEntity (UserRegister userIn);
  UserPrivate toObject (User user);
}
