import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

interface Workout {
  username: string;
  workoutType: string;
  workoutMinutes: number;
}

interface AggregatedWorkout {
  username: string;
  workouts: Workout[];
  numWorkouts: number;
  totalMinutes: number;
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
  
})
export class WorkoutListComponent implements OnChanges {
  [x: string]: any;
  @Input() workouts: Workout[] = [];
  aggregatedWorkouts: AggregatedWorkout[] = [];
  paginatedWorkouts: AggregatedWorkout[] = [];
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  sumTotalMinutes: number = 0; // Variable to store the overall sum of total minutes

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workouts']) {
      this.updateAggregatedWorkouts();
      this.updatePaginatedWorkouts();
    }
  }

  updateAggregatedWorkouts(): void {
    const aggregated: { [username: string]: AggregatedWorkout } = {};
    this.sumTotalMinutes = 0; // Reset the sum of total minutes

    this.workouts.forEach(workout => {
      if (!aggregated[workout.username]) {
        aggregated[workout.username] = {
          username: workout.username,
          workouts: [],
          numWorkouts: 0,
          totalMinutes: 0
        };
      }
      const existingWorkout = aggregated[workout.username].workouts.find(w => w.workoutType === workout.workoutType);
      if (existingWorkout) {
        existingWorkout.workoutMinutes += Number(workout.workoutMinutes);
      } else {
        aggregated[workout.username].workouts.push({ ...workout, workoutMinutes: Number(workout.workoutMinutes) });
      }
      aggregated[workout.username].numWorkouts++;
      aggregated[workout.username].totalMinutes += Number(workout.workoutMinutes);
    });

    // Convert object back to array
    this.aggregatedWorkouts = Object.values(aggregated);
    this.totalItems = this.aggregatedWorkouts.length; // Update total items for paginator

   
  }

  updatePaginatedWorkouts(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedWorkouts = this.aggregatedWorkouts.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedWorkouts();
  }
  
}
