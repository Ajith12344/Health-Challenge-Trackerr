import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSearchComponent } from './workout-search.component';

describe('WorkoutSearchComponent', () => {
  let component: WorkoutSearchComponent;
  let fixture: ComponentFixture<WorkoutSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
