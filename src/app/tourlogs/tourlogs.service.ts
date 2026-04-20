import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Tour } from './tourlogs.model';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TourlogsService {

  constructor(private apiService: ApiService) { }

  getTourLogs(): Observable<Tour[]> {
    return this.apiService.get<Tour[]>('tourlogs');
  }

  editTourLog(tour: Tour): Observable<Tour> {
    return of(tour);
  }
}