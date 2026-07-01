import { Component } from '@angular/core';
import { EditTours } from './edit.tours';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-page',
  imports: [ReactiveFormsModule],
  templateUrl: './tour-page.html',
  styleUrl: './tour-page.css',
})
export class TourPage {
  vm = new EditTours();
}
