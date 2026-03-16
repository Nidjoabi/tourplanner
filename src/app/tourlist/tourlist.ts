import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { SelectableTour } from './selectable-tour';


@Component({
  selector: 'app-tourlist',
  imports: [CommonModule],
  templateUrl: './tourlist.html',
  styleUrl: './tourlist.css',
})

export class Tourlist {
  vm = new SelectableTour();
}