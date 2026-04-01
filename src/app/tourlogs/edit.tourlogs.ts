import { Component, inject, signal } from '@angular/core';
import {Tour} from "./tourlogs.model";
import { computed } from '@angular/core';


export class EditTourlogs {

    ;

    dummyTours= signal<Tour[]>([
        {
            id: 1,
            tripName: 'City Tour',
            from: 'New York',
            to: 'Boston',
            transportation: 'Train',
            distance: 300,
            duration: 4,
            description: 'A scenic train ride from New York to Boston.'
        },
        {
            id: 2,
            tripName: 'Beach Getaway',
            from: 'Los Angeles',
            to: 'Santa Monica',
            transportation: 'Car',
            distance: 15,
            duration: 0.5,
            description: 'A quick drive to the beach for a relaxing day.'
        }
    ]);

    SelectedTourLogId = signal<number | null>(null);

    SelectedTourLog = computed<Tour | null>(() =>
        this.dummyTours().find(tour => tour.id === this.SelectedTourLogId()) ?? null
    );

    tourLogs(): Tour[] {
        return this.dummyTours();
    }

    DeleteTourLog(id: number): void {
        this.dummyTours.set(this.dummyTours().filter(tour => tour.id !== id));
        console.log(`Deleted tour log with id: ${id}`);
    }

    selectTourLog(id: number): void {
    this.SelectedTourLogId.set(id);
    }

    cancelEdit(): void {
        this.SelectedTourLogId.set(null);
    }




}