package org.example.tourplannerbackend.Mapper;

import org.example.tourplannerbackend.DTO.In.CreateTourlog;
import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.Out.TourPublic;
import org.example.tourplannerbackend.DTO.Out.TourlogPublic;
import org.example.tourplannerbackend.Entity.Tourlog;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TourlogMapper {
  Tourlog toEntity (CreateTourlog tourIn);
  TourlogPublic toObject(Tourlog tourlog);
}
