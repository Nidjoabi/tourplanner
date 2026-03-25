import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tourlist } from '../tourlist/tourlist';
import { MapComponent } from '../map/map';
import { CreateTourComponent } from '../tour/tour';

@Component({
  selector: 'app-create-tour-page',
  imports: [CommonModule, Tourlist, MapComponent, CreateTourComponent],
  templateUrl: './create-tour-page.html',
  styleUrl: './create-tour-page.css',
})
export class CreateTourPage {

}
