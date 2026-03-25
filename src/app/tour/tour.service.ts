import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tour } from './tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private tours: Tour[] = [];

  createTour(tour: Tour): Observable<Tour> {
    const newTour: Tour = {
      ...tour,
      id: crypto.randomUUID()
    };

    this.tours.push(newTour);
    return of(newTour);
  }

}