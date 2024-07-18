import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WorkoutService, Workout } from '../workout.service';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit {
  selectedUser: string = '';
  uniqueUsernames: string[] = [];
  chart: any;

  constructor(private workoutService: WorkoutService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const workouts = this.workoutService.getWorkouts();
    this.uniqueUsernames = [...new Set(workouts.map(workout => workout.username))];
  }

  selectUser(username: string): void {
    this.selectedUser = username;
    this.drawChart();
  }

  drawChart(): void {
    const canvas = document.getElementById('workoutChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart instance
    }

    const aggregatedWorkouts = this.workoutService.getAggregatedWorkoutsByUsername(this.selectedUser);
    const workoutTypes = Object.keys(aggregatedWorkouts);
    const workoutMinutes = Object.values(aggregatedWorkouts);

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [{
          label: 'Workout Minutes',
          data: workoutMinutes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 16,
              weight: 'bold'
            },
            bodyFont: {
              size: 14
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Minutes',
              font: {
                size: 14
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Workout Types',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }
}