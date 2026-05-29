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
  private UUID Id;

  private String tourName;
  @Column(name = "to_location")
  private String to;
  @Column(name = "from_location")
  private String from;
  private String transportationType;
  private int distance;
  private int duration;
  private String description;
}
