import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { WorkoutService } from '../workout.service';
import { Chart, registerables } from 'chart.js';
import { of } from 'rxjs';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutChartComponent],
      providers: [
        {
          provide: WorkoutService,
          useValue: {
            getWorkouts: () => [
              { username: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
              { username: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 45 }
            ],
            getAggregatedWorkoutsByUsername: (username: string) => {
              return username === 'John Doe'
                ? { Running: 30 }
                : { Cycling: 45 };
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    Chart.register(...registerables);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize unique usernames on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.uniqueUsernames.length).toBe(2);
    expect(component.uniqueUsernames).toContain('John Doe');
    expect(component.uniqueUsernames).toContain('Jane Smith');
  });

  it('should select a user and draw a chart', () => {
    const spy = spyOn(component, 'drawChart').and.callThrough();
    component.selectUser('John Doe');
    expect(component.selectedUser).toBe('John Doe');
    expect(spy).toHaveBeenCalled();
  });

  it('should draw a chart', () => {
    component.selectUser('John Doe');
    component.drawChart();
    const canvas = document.getElementById('workoutChart') as HTMLCanvasElement;
    expect(canvas).toBeTruthy();
    expect(component.chart).toBeDefined();
  });
});
