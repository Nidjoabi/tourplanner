import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Tour } from './tour.model';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TourPageService {

  constructor(private apiService: ApiService) { }

  getTours(): Observable<Tour[]> {
    return this.apiService.get<Tour[]>('tours');
  }

  editTour(tour: Tour): Observable<Tour> {
    return of(tour);
  }
}