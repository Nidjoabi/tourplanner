import { Component, AfterViewInit, signal, effect, inject } from '@angular/core';
import { MapFacadeService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})

export class MapComponent implements AfterViewInit {
  // Task 5
  readonly centerCoords = signal({ lat: 48.2082, lng: 16.3738, label: 'Vienna' });

  constructor(private mapService: MapFacadeService) {
    effect(() => {
      const { lat, lng, label } = this.centerCoords();
      console.log(`[Effect] Map centering to: ${label} (${lat}, ${lng})`);
      this.mapService.setCenter(lat, lng);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    this.mapService.initMap('map');
  }, 0);
}
centerVienna() { this.centerCoords.set({ lat: 48.2082, lng: 16.3738, label: 'Vienna' }); }
centerBerlin() { this.centerCoords.set({ lat: 52.5200, lng: 13.4050, label: 'Berlin' }); }
}