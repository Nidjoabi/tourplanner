package org.example.tourplannerbackend.Entity;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tour {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID TourId;

  private String TourName;
  @Column(name = "to_location")
  private String To;
  @Column(name = "from_location")
  private String From;
  private String TransportationType;
  private int Distance;
  private int Duration;
  private String Description;
}
