import { Injectable, signal, inject } from '@angular/core';
import { Tourlog } from '../tourlog/tourlog.model';
import { TourlogService } from '../tourlog/tourlog.service';

@Injectable()
export class TourlogPageViewModel {
  private tourlogService = inject(TourlogService);

  tourlogs = signal<Tourlog[]>([]);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  loadTourlogs(tourId: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.tourlogService.getTourlogs(tourId).subscribe({
      next: (logs) => {
        this.tourlogs.set(logs);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load Tour Logs');
        this.isLoading.set(false);
      },
    });
  }

  removeTourlog(tourId: string, id: string): void {
    this.tourlogService.deleteTourlog(tourId, id).subscribe({
      next: () => {
        this.tourlogs.update(logs => logs.filter(l => l.id !== id));
      },
      error: () => {
        this.errorMessage.set('Could not delete Tour Log');
      },
    });
  }
}