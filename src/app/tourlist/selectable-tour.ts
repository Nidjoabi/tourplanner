import { signal, computed } from "@angular/core";

type Tour = {
  readonly id: number;
  readonly name: string;
  readonly details: string;
};

// Task 2
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

  selectedTour = computed<Tour | null>(() =>
    this.tours().find(tour => tour.id === this.selectedTourId()) ?? null
  );

  // Task 4
  tourCount = computed(() => this.tours().length);

  hasSelection = computed(() => this.selectedTourId() !== null);

  selectedIndex = computed(() => {
    const id = this.selectedTourId();
    if (id === null) return -1;
    return this.tours().findIndex(t => t.id === id);
  });

  positionLabel = computed(() => {
    const index = this.selectedIndex();
    if (index === -1) return 'No tour selected';
    return `Tour ${index + 1} of ${this.tourCount()}`;
  });

  selectTour(id: number): void {
    this.selectedTourId.set(id);
  }
}