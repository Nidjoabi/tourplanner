import { signal, computed } from "@angular/core";

type Tour = {
  readonly id: number;
  readonly name: string;
  readonly details: string;
};

export class SelectableTour {
  tours = signal<Tour[]>([
    {
      id: 1,
      name: 'City Tour 1',
      details: 'Explore the city\'s landmarks and hidden gems with our expert guides.',

    },
    {
      id: 2,
      name: 'City Tour 2',
      details: 'Explore the city\'s landmarks and hidden gems with our expert guides.',

    },
    {
      id: 3,
      name: 'City Tour 3',
      details: 'Explore the city\'s landmarks and hidden gems with our expert guides.',

    },
    {
      id: 4,
      name: 'City Tour 4',
      details: 'Explore the city\'s landmarks and hidden gems with our expert guides.',

    },

  ]);

  selectedTourId = signal<number | null>(null);

  selectedTour = computed(() =>
    this.tours().find(tour => tour.id === this.selectedTourId()) ?? null
  );

  selectTour(id: number): void {
    this.selectedTourId.set(id);
  }
}