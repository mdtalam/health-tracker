import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts: any[] = [];

  getWorkouts(): any[] {
    return [...this.workouts];
  }

  addWorkout(workout: any): void {
    this.workouts.push(workout);
  }

  clearWorkouts(): void {
    this.workouts = [];
  }
}
