import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tour } from './tourlogs.model';

@Injectable({
  providedIn: 'root'
})
export class TourlogsService {
  editTourLog(tour: Tour): Observable<Tour> {
    return of(tour);
  }
}