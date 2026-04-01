import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tour } from './tourlogs.model';

@Injectable({
  providedIn: 'root'
})
export class TourlogsService {
  private tours: Tour[] = [];

  editTourLog(tour: Tour): Observable<Tour> {
    const index = this.tours.findIndex(t => t.id === tour.id);
    if (index !== -1) {
        this.tours[index] = tour;
        return of(tour);
    } else {
        return of(null as any);
    }
    }
}