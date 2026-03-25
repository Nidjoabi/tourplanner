import { Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from './tour.service';
import { TransporationType, Tour } from './tour.model';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tour.html',
  styleUrl: './tour.css',
})
export class CreateTourComponent {
  private fb = inject(FormBuilder);
  private tourService = inject(TourService);

  readonly TransportOptions: { type: TransporationType, icon: string, label: string }[] = [
    { type: 'Car', icon: '🚗', label: 'Car' },
    { type: 'Bus', icon: '🚌', label: 'Bus' },
    { type: 'Train', icon: '🚆', label: 'Train' },
    { type: 'Bicycle', icon: '🚲', label: 'Bicycle' }
  ];

  isSaving = false;
  errorMessage: string = "";
  successMessage: string = "";

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
    } else {
      this.summary.set('');
    }
  }

  // Task 1
  selectTransportation(type: TransporationType): void{
    this.tourForm.patchValue({ transportation: type });
    // Task 3
    this.updateSummary();
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
