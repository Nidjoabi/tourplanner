import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Tourlist } from './tourlist/tourlist';
import { Createtour } from './createtour/createtour';
import { Map } from './map/map';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tourlist, Createtour, Map],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tourplanner');
}
