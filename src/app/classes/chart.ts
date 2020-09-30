import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

//Klasa odpowiadająca za generowanie wykresów na podstawie biblioteki ng2-charts.
export class Chart {
  options: ChartOptions;
  chartType: ChartType;
  datasets: ChartDataSets[];
  labels: Label[] = [];

  //Konstruktor klasy, czyli metoda wywoływana przy tworzeniu obiektu na podstawie tej klasy
  constructor() {
    this.options = {
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };

    this.chartType = 'bar';
  }
}
