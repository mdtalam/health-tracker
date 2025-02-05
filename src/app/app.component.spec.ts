import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Use imports for standalone components
      imports: [AppComponent, ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the workout form on load', () => {
    expect(component.workOutForm).toBeDefined();
    expect(component.workOutForm.get('userName')).toBeTruthy();
  });

  it('should add a new workout to the list', () => {
    component.workOutForm.setValue({
      userName: 'John Doe',
      workoutType: 'Cycling',
      minutes: 45,
    });
    component.onSave();
    expect(component.workouts.length).toBe(1);
    expect(component.workouts[0].userName).toBe('John Doe');
  });

  it('should filter the table based on search query', () => {
    component.workouts = [
      { userName: 'John Doe', workoutType: 'Cycling', minutes: 45 },
      { userName: 'Jane Smith', workoutType: 'Running', minutes: 30 },
    ];
    component.searchQuery = 'John';
    component.filterTable();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].userName).toBe('John Doe');
  });

  it('should paginate the filtered results correctly', () => {
    component.workouts = Array.from({ length: 10 }, (_, i) => ({
      userName: `User ${i + 1}`,
      workoutType: 'Cycling',
      minutes: 30,
    }));
    component.itemsPerPage = 5;
    component.currentPage = 2;
    component.filterTable();
    expect(component.filteredWorkouts.length).toBe(5);
    expect(component.filteredWorkouts[0].userName).toBe('User 6');
  });
});
