import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutListComponent],
      imports: [MatPaginatorModule, BrowserAnimationsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update aggregated workouts when input changes', () => {
    const mockWorkouts = [
      { username: 'user1', workoutType: 'Running', workoutMinutes: 30 },
      { username: 'user2', workoutType: 'Cycling', workoutMinutes: 45 },
    ];

    component.workouts = mockWorkouts;
    component.ngOnChanges({ workouts: { currentValue: mockWorkouts } as any });

    fixture.detectChanges();

    expect(component.aggregatedWorkouts.length).toBe(2);
    expect(component.aggregatedWorkouts[0].username).toBe('user1');
    expect(component.aggregatedWorkouts[0].totalMinutes).toBe(30);
    expect(component.aggregatedWorkouts[1].username).toBe('user2');
    expect(component.aggregatedWorkouts[1].totalMinutes).toBe(45);
  });

  it('should update paginated workouts on page change', () => {
    const mockAggregatedWorkouts = [
      { username: 'user1', workouts: [], numWorkouts: 1, totalMinutes: 30 },
      { username: 'user2', workouts: [], numWorkouts: 1, totalMinutes: 45 },
    ];

    component.aggregatedWorkouts = mockAggregatedWorkouts;
    component.totalItems = 2;

    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 1, length: 2 };
    component.onPageChange(pageEvent);

    fixture.detectChanges(); // Ensure Angular processes the changes

    expect(component.paginatedWorkouts.length).toBe(1);
    expect(component.paginatedWorkouts[0].username).toBe('user2');
    expect(component.paginatedWorkouts[0].totalMinutes).toBe(45);
  });

  it('should handle empty workouts list', () => {
    component.workouts = [];
    component.ngOnChanges({ workouts: { currentValue: [] } as any });

    fixture.detectChanges();

    expect(component.aggregatedWorkouts.length).toBe(0);
  });

  it('should handle pagination with an empty aggregated list', () => {
    component.aggregatedWorkouts = [];
    component.totalItems = 0;

    const pageEvent: PageEvent = { pageIndex: 0, pageSize: 1, length: 0 };
    component.onPageChange(pageEvent);

    fixture.detectChanges();

    expect(component.paginatedWorkouts.length).toBe(0);
  });

  it('should initialize with default values', () => {
    expect(component.paginatedWorkouts).toBeDefined();
    expect(component.aggregatedWorkouts).toBeDefined();
  });

  it('should handle page size changes', () => {
    const pageEvent: PageEvent = { pageIndex: 0, pageSize: 2, length: 4 };
    component.totalItems = 4; // Update the total items count

    const mockAggregatedWorkouts = [
      { username: 'user1', workouts: [], numWorkouts: 1, totalMinutes: 30 },
      { username: 'user2', workouts: [], numWorkouts: 1, totalMinutes: 45 },
      { username: 'user3', workouts: [], numWorkouts: 1, totalMinutes: 60 },
      { username: 'user4', workouts: [], numWorkouts: 1, totalMinutes: 75 },
    ];

    component.aggregatedWorkouts = mockAggregatedWorkouts;
    component.onPageChange(pageEvent);

    fixture.detectChanges();

    expect(component.paginatedWorkouts.length).toBe(2); // Expect 2 items per page
    expect(component.paginatedWorkouts[0].username).toBe('user1');
    expect(component.paginatedWorkouts[1].username).toBe('user2');
  });

});
