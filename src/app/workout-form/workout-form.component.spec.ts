import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutService } from '../workout.service';
import { WorkoutFormComponent } from './workout-form.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);

    await TestBed.configureTestingModule({
      declarations: [ WorkoutFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        { provide: WorkoutService, useValue: workoutServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    mockWorkoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.workoutForm).toBeTruthy();
    expect(component.workoutForm.controls['username'].value).toBe('');
    expect(component.workoutForm.controls['workoutType'].value).toBe('');
    expect(component.workoutForm.controls['workoutMinutes'].value).toBe('');
  });

  it('should make the form controls required', () => {
    let username = component.workoutForm.controls['username'];
    let workoutType = component.workoutForm.controls['workoutType'];
    let workoutMinutes = component.workoutForm.controls['workoutMinutes'];

    username.setValue('');
    workoutType.setValue('');
    workoutMinutes.setValue('');

    expect(username.invalid).toBeTrue();
    expect(workoutType.invalid).toBeTrue();
    expect(workoutMinutes.invalid).toBeTrue();

    username.setValue('John Doe');
    workoutType.setValue('Running');
    workoutMinutes.setValue(30);

    expect(username.valid).toBeTrue();
    expect(workoutType.valid).toBeTrue();
    expect(workoutMinutes.valid).toBeTrue();
  });

  it('should store form value in local storage on submit', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(localStorage, 'setItem');

    component.workoutForm.setValue({
      username: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30
    });

    component.onSubmit();

    const expectedWorkouts = [{
      username: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30
    }];
    
    expect(localStorage.setItem).toHaveBeenCalledWith('workouts', JSON.stringify(expectedWorkouts));
  });

  it('should call addWorkout method of WorkoutService on submit', () => {
    component.workoutForm.setValue({
      username: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30
    });

    component.onSubmit();

    expect(mockWorkoutService.addWorkout).toHaveBeenCalledWith({
      username: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30
    });
  });

  it('should navigate to the search page on submit', () => {
    component.workoutForm.setValue({
      username: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30
    });

    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search']);
  });

});
