import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workout-search',
  templateUrl: './workout-search.component.html',
  styleUrls: ['./workout-search.component.css']
})
export class WorkoutSearchComponent implements OnInit {
  [x: string]: any;
  @Output() searchResults = new EventEmitter<any[]>();
  
  searchTerm: string = '';
  filterType: string = 'All Types'; // Set initial value to 'All Types'
  workoutTypes: string[] = ['All Types', 'Running', 'Cycling', 'Swimming']; // Include 'All Types' as the first option
  workouts: any[] = [];
  filteredWorkouts: any[] = [];

  constructor(private workoutService: WorkoutService,private router: Router) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = this.workouts;
    this.applyFilterAndSearch();
  }

  onSearch(): void {
    this.applyFilterAndSearch();
  }

  onFilter(): void {
    this.applyFilterAndSearch();
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
  private applyFilterAndSearch(): void {
    // Filter by workout type
    this.filteredWorkouts = this.workouts.filter(workout => {
      const typeMatch = this.filterType === 'All Types' || workout.workoutType === this.filterType;
      const usernameMatch = workout.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      return typeMatch && usernameMatch;
    });

    // Emit filtered results
    this.searchResults.emit(this.filteredWorkouts);
  }
}