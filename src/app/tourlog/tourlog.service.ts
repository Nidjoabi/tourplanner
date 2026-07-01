import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tourlog, CreateTourlogDto } from './tourlog.model';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TourlogService {
  constructor(private apiService: ApiService) {}

  getTourlogs(tourId: string): Observable<Tourlog[]> {
    return this.apiService.get<Tourlog[]>(`tours/${tourId}/tourlogs`);
  }

  getMyTourlogs(): Observable<Tourlog[]> {
    return this.apiService.get<Tourlog[]>('tourlogs');
  }

  getTourlogById(tourId: string, id: string): Observable<Tourlog> {
    return this.apiService.get<Tourlog>(`tours/${tourId}/tourlogs/${id}`);
  }

  createTourlog(tourId: string, tourlog: CreateTourlogDto): Observable<Tourlog> {
    return this.apiService.post<Tourlog>(`tours/${tourId}/tourlogs`, tourlog);
  }

  updateTourlog(tourId: string, id: string, tourlog: CreateTourlogDto): Observable<Tourlog> {
    return this.apiService.put<Tourlog>(`tours/${tourId}/tourlogs/${id}`, tourlog);
  }

  deleteTourlog(tourId: string, id: string): Observable<void> {
    return this.apiService.delete<void>(`tours/${tourId}/tourlogs/${id}`);
  }
}