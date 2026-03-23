import { Component, AfterViewInit } from '@angular/core';
import { MapFacadeService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})

export class MapComponent implements AfterViewInit {

  constructor(private mapService: MapFacadeService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
    this.mapService.initMap('map');
  }, 0);
}
}
