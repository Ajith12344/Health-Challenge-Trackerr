import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'workout', component: WorkoutFormComponent },
  { path: 'charts', component: WorkoutChartComponent },
  { path: 'search', component:WorkoutListComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
