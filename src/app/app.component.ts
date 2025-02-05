import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // Import required Angular modules
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'health-tracker';
  workOutForm!: FormGroup;
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  searchQuery: string = '';
  filterType: string = 'All';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.workOutForm = this.fb.group({
      userName: ['', Validators.required],
      workoutType: ['Cycling', Validators.required],
      minutes: [0, [Validators.required, Validators.min(1)]],
    });

    this.loadWorkouts();
  }

  onSave() {
    if (this.workOutForm.valid) {
      const newWorkout = this.workOutForm.value;

      this.workouts.push(newWorkout);
      localStorage.setItem('workouts', JSON.stringify(this.workouts));
      this.filterTable();
      this.workOutForm.reset({ workoutType: 'Cycling', minutes: 0 });
    }
  }

  loadWorkouts() {
    const storedData = localStorage.getItem('workouts');
    if (storedData) {
      this.workouts = JSON.parse(storedData);
    }
    this.filterTable();
  }

  filterTable() {
    let filtered = [...this.workouts];

    if (this.searchQuery) {
      filtered = filtered.filter((w) =>
        w.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.filterType !== 'All') {
      filtered = filtered.filter((w) => w.workoutType === this.filterType);
    }

    this.filteredWorkouts = filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number) {
    this.currentPage = page;
    this.filterTable();
  }

  updateItemsPerPage(count: number) {
    this.itemsPerPage = count;
    this.filterTable();
  }
}
