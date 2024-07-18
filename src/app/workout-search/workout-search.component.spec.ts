import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { WorkoutSearchComponent } from './workout-search.component';

describe('WorkoutSearchComponent', () => {
  let component: WorkoutSearchComponent;
  let fixture: ComponentFixture<WorkoutSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutSearchComponent],
      imports: [FormsModule], // Add FormsModule here
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize workouts and filteredWorkouts', () => {
    expect(component.workouts).toBeDefined();
    expect(component.filteredWorkouts).toBeDefined();
  });

  // Add other tests as needed
});
