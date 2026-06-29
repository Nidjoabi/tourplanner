import { Component } from '@angular/core';
import { EditTourlogs } from './edit.tourlogs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tourlogs',
  imports: [ReactiveFormsModule],
  templateUrl: './tourlogs.html',
  styleUrl: './tourlogs.css',
})
export class Tourlogs {
  vm = new EditTourlogs();
}
