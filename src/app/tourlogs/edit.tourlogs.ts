import { Component, inject, signal } from '@angular/core';
import {Tour, TransporationType} from "./tourlogs.model";
import { computed } from '@angular/core';
import { TourlogsService } from './tourlogs.service';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


export class EditTourlogs {

    private tourlogsService = inject(TourlogsService);

    isSaving = false;
    errorMessage: string = "";
    successMessage: string = "";

    dummyTours= signal<Tour[]>([
        {
            id: 1,
            tripName: 'City Tour',
            from: 'New York',
            to: 'Boston',
            transportation: 'Train',
            distance: 300,
            duration: 4,
            description: 'A scenic train ride from New York to Boston.',
            image: 'https://picsum.photos/seed/tour1/400/200'
        },
        {
            id: 2,
            tripName: 'Beach Getaway',
            from: 'Los Angeles',
            to: 'Santa Monica',
            transportation: 'Car',
            distance: 15,
            duration: 0.5,
            description: 'A quick drive to the beach for a relaxing day.',
            image: 'https://picsum.photos/seed/tour2/400/200'
        }
    ]);

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

   
    SelectedTourLogId = signal<number | null>(null);

    SelectedTourLog = computed<Tour | null>(() =>
        this.dummyTours().find(tour => tour.id === this.SelectedTourLogId()) ?? null
    );

    tourLogs(): Tour[] {
        return this.dummyTours();
    }

    DeleteTourLog(id: number): void {
        this.dummyTours.set(this.dummyTours().filter(tour => tour.id !== id));
        console.log(`Deleted tour log with id: ${id}`);
    }

    EditTourLog(): void {
      this.successMessage = "";
      this.errorMessage = "";

      if (this.tourForm.invalid) {
        this.tourForm.markAllAsTouched();
        return;
      }

      const selectedId = this.SelectedTourLogId();
      if (selectedId === null) return;

      this.isSaving = true;

      const tour: Tour = {
        id: selectedId,
        ...this.tourForm.getRawValue()
      };

      this.tourlogsService.editTourLog(tour).subscribe({
        next: (updatedTour) => {
          this.isSaving = false;

          const fixedTour: Tour = {
            ...updatedTour,
            id: selectedId
          };

          this.dummyTours.update(tours =>
            tours.map(t =>
              t.id === selectedId ? fixedTour : t
            )
          );

          this.successMessage = `Tour "${fixedTour.tripName}" updated successfully!`;
          console.log('Updated Tour:', fixedTour);
          this.cancelEdit();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = "An error occurred while updating the tour. Please try again.";
        }
      });
    }


    selectTourLog(id: number): void {
      this.SelectedTourLogId.set(id);

      const tour = this.dummyTours().find(tour => tour.id === id);
      if (!tour) return;

      this.tourForm.patchValue({
        tripName: tour.tripName,
        from: tour.from,
        to: tour.to,
        transportation: tour.transportation,
        duration: tour.duration,
        distance: tour.distance,
        description: tour.description
      });
    }

    cancelEdit(): void {
        this.SelectedTourLogId.set(null);
    }






}