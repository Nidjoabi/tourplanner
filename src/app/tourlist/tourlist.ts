import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Tour {
  readonly id: number;
  readonly name: string;
  readonly details: string;
}

@Component({
  selector: 'app-tourlist',
  imports: [CommonModule],
  templateUrl: './tourlist.html',
  styleUrl: './tourlist.css',
})
export class Tourlist {
  tours : Tour[] = [
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

  ];


  selectedTour: Tour | null = null;

  selectTour(tour: Tour): void {
    this.selectedTour = tour;
    console.log(`Selected tour: ${tour.name}`);
  }
}
