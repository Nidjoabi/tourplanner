import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourlogComponent } from '../tourlog/tourlog';
import { MyTourlogsPageViewModel } from './my-tourlogs-page.viewmodel';

@Component({
  selector: 'app-my-tourlogs-page',
  standalone: true,
  imports: [CommonModule, TourlogComponent],
  providers: [MyTourlogsPageViewModel],
  templateUrl: './my-tourlogs-page.html',
  styleUrl: './my-tourlogs-page.css',
})
export class MyTourlogsPage implements OnInit {
  vm = inject(MyTourlogsPageViewModel);

  ngOnInit(): void {
    this.vm.loadMyTourlogs();
  }
}