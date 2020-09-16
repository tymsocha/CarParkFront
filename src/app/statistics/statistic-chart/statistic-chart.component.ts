import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-statistic-chart',
  templateUrl: './statistic-chart.component.html',
  styleUrls: ['./statistic-chart.component.css']
})
export class StatisticChartComponent {

  constructor() { }

  step = 0;

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

}
