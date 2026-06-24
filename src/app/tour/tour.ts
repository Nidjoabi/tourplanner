import { Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from './tour.service';
import { TransporationType, Tour } from './tour.model';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MapFacadeService } from '../../services/map.service';

@Component({
  selector: 'app-tour',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tour.html',
  styleUrl: './tour.css',
})
export class CreateTourComponent {
  private fb = inject(FormBuilder);
  private tourService = inject(TourService);
  private mapService = inject(MapFacadeService);
  private routeTimer: any = null;

  readonly TransportOptions: { type: TransporationType, icon: string, label: string }[] = [
    { type: 'Car', icon: '🚗', label: 'Car' },
    { type: 'Bus', icon: '🚌', label: 'Bus' },
    { type: 'Bicycle', icon: '🚲', label: 'Bicycle' }
  ];

  isSaving = false;
  errorMessage: string = "";
  successMessage: string = "";
  isLoadingRoute = false;
  readonly displayDuration = signal('');
  readonly displayDistance = signal('');

  // Task 1
  tourForm = new FormGroup({
    tripName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    from: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    to: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    transportation: new FormControl<TransporationType>('Car', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    duration: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    distance: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)]
    })
  });

  // Task 3 — Mediator
  readonly summary = signal('');

  updateSummary(): void {
    const { from, to, transportation } = this.tourForm.getRawValue();
    if (from && to) {
      this.summary.set(`${transportation} from ${from} to ${to}`);

      if(this.routeTimer) clearTimeout(this.routeTimer);
      this.routeTimer = setTimeout(() => {
        this.calculateRoute(from, to);
      }, 1000);
    } else {
      this.summary.set('');
    }
  }
  async calculateRoute(from: string, to: string): Promise<void> {
    if (!from || !to) return;
    this.isLoadingRoute = true;
    try {
      const transportation = this.tourForm.controls.transportation.value;
      const { distance, duration } = await this.mapService.showRoute(from, to, transportation);
      //Distance und duration auto eintragen
      this.tourForm.patchValue({ distance, duration });
      this.displayDuration.set(this.formatDuration(duration));
      this.displayDistance.set(this.formatDistance(distance));
    } catch (e) {
      console.error('Error on Route Calculation:', e);
    } finally {
      this.isLoadingRoute = false;
    }
  }
  formatDuration(minutes: number): string {
    if (minutes <= 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} h ${mins} min`;
  }
  formatDistance(km: number): string {
    return `${km.toFixed(1)} km`;
  }

  // Task 1
  selectTransportation(type: TransporationType): void{
    this.tourForm.patchValue({ transportation: type });
    // Task 3
    this.updateSummary();
    const {from, to} = this.tourForm.getRawValue();
    if (from && to) {
      this.calculateRoute(from, to);
    }
  }

  get selectedTransportationType(): TransporationType {
    return this.tourForm.controls.transportation.value;
  }

  clearForm(): void {
    this.tourForm.reset({
      tripName: '',
      from: '',
      to: '',
      transportation: 'Car',
      duration: 0,
      distance: 0,
      description: ''
    });
  }

  // Task 1
  submit(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (this.tourForm.invalid) {
      this.tourForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const tour: Tour = this.tourForm.getRawValue();

    this.tourService.createTour(tour).subscribe({
      next: (createdTour) => {
        this.isSaving = false;
        this.successMessage = `Tour "${createdTour.tripName}" created successfully!`;
        console.log('Created Tour:', createdTour);
        this.clearForm();
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = "An error occurred while creating the tour. Please try again.";
      }
    });
  }
}
