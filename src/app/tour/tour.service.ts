import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tour } from './tour.model';
import { ApiService} from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  constructor(private apiService: ApiService) {}

  getTours(): Observable<Tour[]> {
    return this.apiService.get<Tour[]>('tours');
  }

  createTour(tour: Tour): Observable<Tour> {
    return this.apiService.post<Tour>('tours', tour);
  }

  updateTour(id: string, tour: Tour): Observable<Tour> {
    return this.apiService.put<Tour>(`tours/${id}`, tour);
  }
  deleteTour(id: string): Observable<void> {
    return this.apiService.delete<void>(`tours/${id}`);
  }
}
