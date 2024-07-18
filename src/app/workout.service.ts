import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Workout {
  username: string;
  workoutType: string;
  workoutMinutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const initialData: Workout[] = [
      { username: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
      { username: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 45 },
      { username: 'Alex Johnson', workoutType: 'Swimming', workoutMinutes: 60 }
      
    ];

    if (isPlatformBrowser(this.platformId)) {
      const storedWorkouts = localStorage.getItem('workouts');
      this.workouts = storedWorkouts ? JSON.parse(storedWorkouts) : initialData;
    } else {
      this.workouts = initialData;
    }
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  addWorkout(workout: Workout): void {
    // Validate the workout data before adding
    if (workout && workout.username && workout.workoutType && workout.workoutMinutes >= 0) {
      this.workouts.push(workout);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('workouts', JSON.stringify(this.workouts));
      }
    }
  }

  getAggregatedWorkoutsByUsername(username: string): { [key: string]: number } {
    const userWorkouts = this.workouts.filter(workout => workout.username === username);
    return userWorkouts.reduce((acc, workout) => {
      if (acc[workout.workoutType]) {
        acc[workout.workoutType] += workout.workoutMinutes;
      } else {
        acc[workout.workoutType] = workout.workoutMinutes;
      }
      return acc;
    }, {} as { [key: string]: number });
  }
}
