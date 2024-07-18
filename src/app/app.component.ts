import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  workouts: any[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.updateWorkouts();
  }

  updateWorkouts(searchResults: any[] = this.workoutService.getWorkouts()) {
    this.workouts = searchResults;
  }
}