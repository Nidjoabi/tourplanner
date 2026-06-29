import { inject, signal } from '@angular/core';
import {Tour, TransporationType} from "../tour/tour.model";
import { computed } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { TourService } from '../tour/tour.service';

export class EditTourlogs {

    private tourService = inject(TourService);

    isSaving = false;
    errorMessage: string = "";
    successMessage: string = "";

    tours= signal<Tour[]>([]);

    tourForm = new FormGroup({
    tourName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    from: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    to: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    transportationType: new FormControl<TransporationType>('Car', {
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

    SelectedTourId = signal<string | null>(null);

    SelectedTour = computed<Tour | null>(() =>
        this.tours().find(tour => tour.id === this.SelectedTourId()) ?? null
    );

    constructor() {
      this.loadTours();
    }

    loadTours(): void {
      this.tourService.getTours().subscribe({
        next: (tours) => this.tours.set(tours),
        error: () => this.errorMessage = "Could not load Tours"
      });
    }

    DeleteTour(id: string): void {
      this.tourService.deleteTour(id).subscribe({
        next: () => {
          this.tours.set(this.tours().filter(tour => tour.id !== id));
          this.successMessage = "Tour deleted successfully.";
          },
        error: () => this.errorMessage = "Could not delete Tour"
      });
    }

    EditTour(): void {
      this.successMessage = "";
      this.errorMessage = "";

      if (this.tourForm.invalid) {
        this.tourForm.markAllAsTouched();
        return;
      }

      const selectedId = this.SelectedTourId();
      if (selectedId === null) return;

      this.isSaving = true;

      const tour: Tour = {
        id: selectedId,
        ...this.tourForm.getRawValue()
      };

      this.tourService.updateTour(selectedId, tour).subscribe({
        next: (updatedTour) => {
          this.isSaving = false;
          this.tours.update(tours => tours.map(t => t.id === selectedId ? updatedTour : t)
          );
          this.successMessage = `Tour "${updatedTour.tourName}" updated successfully!`;
          this.cancelEdit();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = "An error occurred while updating the tour. Please try again.";
        }
      });
    }


    selectTour(id: string): void {
      this.SelectedTourId.set(id);

      const tour = this.tours().find(tour => tour.id === id);
      if (!tour) return;

      this.tourForm.patchValue({
        tourName: tour.tourName,
        from: tour.from,
        to: tour.to,
        transportationType: tour.transportationType,
        duration: tour.duration,
        distance: tour.distance,
        description: tour.description
      });
    }

    cancelEdit(): void {
      this.SelectedTourId.set(null);
    }
}
