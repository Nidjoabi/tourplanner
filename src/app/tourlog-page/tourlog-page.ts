import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TourlogComponent } from '../tourlog/tourlog';
import { TourlogPageViewModel } from './tourlog-page.viewmodel';

@Component({
  selector: 'app-tourlog-page',
  standalone: true,
  imports: [CommonModule, TourlogComponent],
  providers: [TourlogPageViewModel],
  templateUrl: './tourlog-page.html',
  styleUrl: './tourlog-page.css',
})
export class TourlogPage implements OnInit {
  private route = inject(ActivatedRoute);
  vm = inject(TourlogPageViewModel);

  tourId = '';

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('tourId') ?? '';
    this.vm.loadTourlogs(this.tourId);
  }

  onDeleted(id: string): void {
    this.vm.removeTourlog(this.tourId, id);
  }
}