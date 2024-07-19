import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutSearchComponent } from './workout-search.component';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('WorkoutSearchComponent', () => {
  let component: WorkoutSearchComponent;
  let fixture: ComponentFixture<WorkoutSearchComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['getWorkouts']);

    await TestBed.configureTestingModule({
      declarations: [WorkoutSearchComponent],
      imports: [FormsModule],
      providers: [{ provide: WorkoutService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutSearchComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    
    workoutService.getWorkouts.and.returnValue([
      { username: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
      { username: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 45 },
      { username: 'Alex Johnson', workoutType: 'Swimming', workoutMinutes: 60 }
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all workouts', () => {
    component.ngOnInit();
    expect(component.workouts.length).toBe(3);
    expect(component.filteredWorkouts.length).toBe(3);
  });

  it('should filter workouts by search term', () => {
    component.ngOnInit();
    component.searchTerm = 'Jane';
    component.onSearch();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].username).toBe('Jane Smith');
  });

  it('should filter workouts by workout type', () => {
    component.ngOnInit();
    component.filterType = 'Running';
    component.onFilter();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].workoutType).toBe('Running');
  });

  it('should filter workouts by search term and workout type', () => {
    component.ngOnInit();
    component.searchTerm = 'Jane';
    component.filterType = 'Cycling';
    component.onSearch();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].username).toBe('Jane Smith');
  });

  it('should emit search results when applying filter and search', () => {
    spyOn(component.searchResults, 'emit');
    component.ngOnInit();
    component.searchTerm = 'Jane';
    component.onSearch();
    expect(component.searchResults.emit).toHaveBeenCalledWith(component.filteredWorkouts);
  });
});
