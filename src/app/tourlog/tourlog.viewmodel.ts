import { Injectable, signal, computed } from '@angular/core';
import { Tourlog } from './tourlog.model';

@Injectable()
export class TourlogViewModel {
  private _tourlog = signal<Tourlog | null>(null);
  tourlog = this._tourlog.asReadonly();

  ratingStars = computed(() => {
    const log = this._tourlog();
    return log ? '⭐'.repeat(log.ratings) : '';
  });

  difficultyClass = computed(() => {
    const log = this._tourlog();
    if (!log) return {};
    return {
      easy: log.difficulty === 'EASY',
      medium: log.difficulty === 'MEDIUM',
      hard: log.difficulty === 'HARD',
    };
  });

  setTourlog(tourlog: Tourlog): void {
    this._tourlog.set(tourlog);
  }
}