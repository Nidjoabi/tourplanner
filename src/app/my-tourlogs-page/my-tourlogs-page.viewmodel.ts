import { Injectable, signal, inject } from '@angular/core';
import { Tourlog } from '../tourlog/tourlog.model';
import { TourlogService } from '../tourlog/tourlog.service';
import { Router } from '@angular/router';

@Injectable()
export class MyTourlogsPageViewModel {
  private tourlogService = inject(TourlogService);
  private router = inject(Router);

  tourlogs = signal<Tourlog[]>([]);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  loadMyTourlogs(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.tourlogService.getMyTourlogs().subscribe({
      next: (logs) => {
        this.tourlogs.set(logs);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load your Tour Logs');
        this.isLoading.set(false);
      },
    });
  }

  deleteTourlog(tourId: string, id: string): void {
    this.tourlogService.deleteTourlog(tourId, id).subscribe({
        next: () => {
        this.tourlogs.update((logs) => logs.filter((log) => log.id !== id));
        },
        error: () => {
        this.errorMessage.set('Could not delete the Tour Log');
        }
    });
    }

    navigateToEdit(tourId: string, id: string): void {
    this.router.navigate(['/tours', tourId, 'tourlogs', id, 'edit']);
  }
}