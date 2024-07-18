import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  workoutForm!: FormGroup;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming'];

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      username: ['', Validators.required],
      workoutType: ['', Validators.required],
      workoutMinutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      this.workoutService.addWorkout(this.workoutForm.value);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.workoutForm.reset();
  }
}
