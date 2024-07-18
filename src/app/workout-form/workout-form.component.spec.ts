// src/app/workout-form/workout-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../workout.service';
import { of } from 'rxjs';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutServiceSpy: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);

    await TestBed.configureTestingModule({
      declarations: [WorkoutFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: WorkoutService, useValue: spy }]
    }).compileComponents();

    workoutServiceSpy = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 3 controls', () => {
    expect(component.workoutForm.contains('username')).toBeTruthy();
    expect(component.workoutForm.contains('workoutType')).toBeTruthy();
    expect(component.workoutForm.contains('workoutMinutes')).toBeTruthy();
  });

  it('should make the username control required', () => {
    const control = component.workoutForm.get('username');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the workoutType control required', () => {
    const control = component.workoutForm.get('workoutType');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the workoutMinutes control required and validate it', () => {
    const control = component.workoutForm.get('workoutMinutes');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue(0);
    expect(control?.valid).toBeFalsy();

    control?.setValue(10);
    expect(control?.valid).toBeTruthy();
  });

  it('should call the addWorkout method on submit if form is valid', () => {
    const workoutData = { username: 'John', workoutType: 'Running', workoutMinutes: 30 };
    component.workoutForm.setValue(workoutData);

    component.onSubmit();

    expect(workoutServiceSpy.addWorkout).toHaveBeenCalledWith(workoutData);
  });

  it('should reset the form after submit', () => {
    spyOn(component, 'resetForm');
    const workoutData = { username: 'John', workoutType: 'Running', workoutMinutes: 30 };
    component.workoutForm.setValue(workoutData);

    component.onSubmit();

    expect(component.resetForm).toHaveBeenCalled();
  });
});
