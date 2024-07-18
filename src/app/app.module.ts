import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // combined FormsModule and ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutSearchComponent } from './workout-search/workout-search.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { TableModule } from 'primeng/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WorkoutService } from './workout.service'; // Ensure the service is correctly imported
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    WorkoutSearchComponent,
    WorkoutChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,BrowserAnimationsModule,NoopAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    WorkoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
