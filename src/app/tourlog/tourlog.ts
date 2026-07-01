import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourlogViewModel } from './tourlog.viewmodel';
import { Tourlog } from './tourlog.model';

@Component({
  selector: 'app-tourlog',
  standalone: true,
  imports: [CommonModule],
  providers: [TourlogViewModel], // eigene Instanz pro Component
  templateUrl: './tourlog.html',
  styleUrl: './tourlog.css',
})
export class TourlogComponent implements OnInit {
  @Input({ required: true }) tourlogData!: Tourlog;
  @Output() deleted = new EventEmitter<string>();
  @Output() editRequested = new EventEmitter<string>();

  vm = inject(TourlogViewModel);

  ngOnInit(): void {
    this.vm.setTourlog(this.tourlogData);
  }

  onDelete(): void {
    this.deleted.emit(this.tourlogData.id);
  }

  onEdit(): void {
    this.editRequested.emit(this.tourlogData.id);
  }
}