import { Component } from '@angular/core';
import {Tour} from "./tourlogs.model";
import { EditTourlogs } from './edit.tourlogs';

@Component({
  selector: 'app-tourlogs',
  imports: [],
  templateUrl: './tourlogs.html',
  styleUrl: './tourlogs.css',
})
export class Tourlogs {

  vm = new EditTourlogs();

}
