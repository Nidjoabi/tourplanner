package org.example.tourplannerbackend.Mapper;


import org.example.tourplannerbackend.DTO.In.TourCreate;
import org.example.tourplannerbackend.DTO.Out.TourPublic;
import org.example.tourplannerbackend.Entity.Tour;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface Tourmapper {
  Tour toEntity (TourCreate tourIn);
  TourPublic toObject(Tour tour);
}
