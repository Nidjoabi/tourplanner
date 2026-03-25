import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tourlist } from '../tourlist/tourlist';
import { MapComponent } from '../map/map';
import { Createtour } from '../createtour/createtour';

@Component({
  selector: 'app-create-tour-page',
  imports: [CommonModule, Tourlist, MapComponent, Createtour],
  templateUrl: './create-tour-page.html',
  styleUrl: './create-tour-page.css',
})
export class CreateTourPage {

}
