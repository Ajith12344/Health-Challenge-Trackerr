import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation
import { WorkoutService } from '../workout.service'; // Adjust path as per your project

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  workoutForm!: FormGroup;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming']; // Define your workout types here

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      username: ['', Validators.required],
      workoutType: ['', Validators.required], 
      workoutMinutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
  onSubmit(): void {
    if (this.workoutForm.valid) {
      // Store the form value in local storage
      const formValue = this.workoutForm.value;
      let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
      workouts.push(formValue);
      localStorage.setItem('workouts', JSON.stringify(workouts));
      
      // Add the workout using the service
      this.workoutService.addWorkout(formValue);
      
      // Reset the form
      this.workoutForm.reset();

      // Navigate to the search page
      this.router.navigate(['/search']);
    }
  }
}
