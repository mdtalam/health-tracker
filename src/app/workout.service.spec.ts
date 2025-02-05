import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout to the list', () => {
    const workout = { userName: 'John', workoutType: 'Cycling', minutes: 30 };
    service.addWorkout(workout);
    expect(service.getWorkouts().length).toBe(1);
    expect(service.getWorkouts()[0]).toEqual(workout);
  });

  it('should retrieve all workouts', () => {
    const workouts = [
      { userName: 'John', workoutType: 'Cycling', minutes: 30 },
      { userName: 'Jane', workoutType: 'Running', minutes: 40 },
    ];
    workouts.forEach((w) => service.addWorkout(w));
    expect(service.getWorkouts()).toEqual(workouts);
  });

  it('should clear all workouts', () => {
    service.addWorkout({
      userName: 'John',
      workoutType: 'Cycling',
      minutes: 30,
    });
    service.clearWorkouts();
    expect(service.getWorkouts().length).toBe(0);
  });
});
