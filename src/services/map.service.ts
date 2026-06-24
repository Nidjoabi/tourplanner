import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {environment} from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class MapFacadeService {
  private map: L.Map | null = null;
  private routeLayer: L.Polyline | null = null;
  private markers: L.Marker[] = [];

  private readonly ORS_API_KEY = environment.orsApiKey;

  initMap(containerId: string): void {
    if (this.map) return;

    this.map = L.map(containerId, {
      zoomControl: true,
      attributionControl: true,
    });

    // Base tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Safe default view (Vienna)
    this.map.setView([48.2082, 16.3738], 12);
  }

  setCenter(lat: number, lng: number, zoom = 13): void {
    this.map?.setView([lat, lng], zoom);
  }

  setMarker(lat: number, lng: number): void {
    if (!this.map) return;
    L.marker([lat, lng]).addTo(this.map);
  }
  //Text zu Koordinaten
  async geocode(place: string): Promise<[number, number]> {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${this.ORS_API_KEY}&text=${encodeURIComponent(place)}&size=1`;
    const response = await fetch(url);
    const data = await response.json();
    const [lng, lat] = data.features[0].geometry.coordinates;
    return [lat, lng];
  }
  //Route berechnen und auf Karte anzeigen
  async showRoute(from: string, to: string, transportation: string): Promise<{ distance: number, duration: number }> {
    const [fromLat, fromLng] = await this.geocode(from);
    const [toLat, toLng] = await this.geocode(to);

    const profileMap: { [key: string]: string } = {
      'Car': 'driving-car',
      'Bus': 'driving-car',
      'Bicycle': 'cycling-regular',
    };
    const profile = profileMap[transportation] || 'driving-car';

    const url = `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${this.ORS_API_KEY}&start=${fromLng},${fromLat}&end=${toLng},${toLat}`; // Route berechnen
    const response = await fetch(url);
    const data = await response.json();

    const route = data.features[0];
    const distance = Math.round(route.properties.segments[0].distance / 1000*10) / 10; // km
    const duration = Math.round(route.properties.segments[0].duration / 60);   // Minuten

    if (this.routeLayer) { // Route auf Karte zeichnen
      this.map?.removeLayer(this.routeLayer);
    }

    this.markers.forEach(marker => this.map?.removeLayer(marker));
    this.markers = [];

    const coordinates = route.geometry.coordinates.map(
      ([lng, lat]: [number, number]) => [lat, lng] as L.LatLngTuple
    );

    this.routeLayer = L.polyline(coordinates, { color: '#2563eb', weight: 4 }).addTo(this.map!);
    this.map?.fitBounds(this.routeLayer.getBounds());
    // Marker setzen
    const fromMarker = L.marker([fromLat, fromLng]).addTo(this.map!);
    const toMarker = L.marker([toLat, toLng]).addTo(this.map!);
    this.markers.push(fromMarker, toMarker);

    return { distance, duration };
  }
}
