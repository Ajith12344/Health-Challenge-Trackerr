import { TestBed } from '@angular/core/testing';
import { WorkoutService, Workout } from './workout.service';
import { PLATFORM_ID } from '@angular/core';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    // Default setup with PLATFORM_ID as 'browser'
    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        { provide: PLATFORM_ID, useValue: 'browser' } // Mock PLATFORM_ID for browser environment
      ]
    });
    service = TestBed.inject(WorkoutService);

    // Reset the workouts to a known state
    service['workouts'] = [
      { username: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
      { username: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 45 },
      { username: 'Alex Johnson', workoutType: 'Swimming', workoutMinutes: 60 }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve initial workouts', () => {
    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(3);
    expect(workouts[0].username).toBe('John Doe');
    expect(workouts[0].workoutMinutes).toBe(30);
  });

  it('should add a workout', () => {
    const newWorkout: Workout = { username: 'Alice', workoutType: 'Running', workoutMinutes: 25 };
    service.addWorkout(newWorkout);
    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(4);
    expect(workouts[3].username).toBe('Alice');
    expect(workouts[3].workoutMinutes).toBe(25);
  });

  it('should aggregate workouts by username', () => {
    const aggregated = service.getAggregatedWorkoutsByUsername('John Doe');
    expect(aggregated['Running']).toBe(30);
  });

  it('should handle empty workout list', () => {
    // Create a new instance of WorkoutService to test the empty list scenario
    const emptyService = new WorkoutService('browser');
    const aggregated = emptyService.getAggregatedWorkoutsByUsername('Nonexistent User');
    expect(Object.keys(aggregated).length).toBe(0);
  });

  it('should handle non-existent user in aggregation', () => {
    const aggregated = service.getAggregatedWorkoutsByUsername('Nonexistent User');
    expect(Object.keys(aggregated).length).toBe(0);
  });

  it('should handle multiple workouts for the same user', () => {
    const additionalWorkouts: Workout[] = [
      { username: 'John Doe', workoutType: 'Cycling', workoutMinutes: 45 },
      { username: 'John Doe', workoutType: 'Swimming', workoutMinutes: 60 }
    ];
    additionalWorkouts.forEach(workout => service.addWorkout(workout));

    const aggregated = service.getAggregatedWorkoutsByUsername('John Doe');
    expect(aggregated['Running']).toBe(30);
    expect(aggregated['Cycling']).toBe(45);
    expect(aggregated['Swimming']).toBe(60);
  });

  it('should handle updates correctly', () => {
    // Add a workout, then update it
    service.addWorkout({ username: 'Alice', workoutType: 'Running', workoutMinutes: 25 });
    let workouts = service.getWorkouts();
    expect(workouts.length).toBe(4);

    // Simulate an update by adding another workout with the same user and type
    service.addWorkout({ username: 'Alice', workoutType: 'Running', workoutMinutes: 15 });
    workouts = service.getWorkouts();
    expect(workouts.length).toBe(5);

    const aggregated = service.getAggregatedWorkoutsByUsername('Alice');
    expect(aggregated['Running']).toBe(40); // Should aggregate to 25 + 15
  });

  it('should handle edge cases in aggregation', () => {
    // Test with an empty string as username
    const aggregated = service.getAggregatedWorkoutsByUsername('');
    expect(Object.keys(aggregated).length).toBe(0);
  });

  it('should handle large number of workouts', () => {
    // Test with a large number of workouts
    for (let i = 0; i < 1000; i++) {
      service.addWorkout({ username: `User${i}`, workoutType: 'Running', workoutMinutes: i });
    }

    const aggregated = service.getAggregatedWorkoutsByUsername('User999');
    expect(aggregated['Running']).toBe(999); // Only User999 should have a workout
  });

  it('should handle invalid data gracefully', () => {
    // Attempt to add an invalid workout
    const invalidWorkout: any = { username: null, workoutType: undefined, workoutMinutes: 'invalid' };
    service.addWorkout(invalidWorkout);
    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(3); // The invalid workout should be ignored
  });
});

describe('WorkoutService (Server Environment)', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        { provide: PLATFORM_ID, useValue: 'server' } // Mock PLATFORM_ID for server environment
      ]
    });
    service = TestBed.inject(WorkoutService);

    // Reset the workouts to a known state
    service['workouts'] = [
      { username: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
      { username: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 45 },
      { username: 'Alex Johnson', workoutType: 'Swimming', workoutMinutes: 60 }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not interact with localStorage in server environment', () => {
    const spy = spyOn(localStorage, 'setItem');
    service.addWorkout({ username: 'Bob', workoutType: 'Yoga', workoutMinutes: 40 });
    expect(spy).not.toHaveBeenCalled(); // Ensure localStorage interaction does not occur
  });
});
