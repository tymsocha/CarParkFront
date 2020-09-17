import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

export class ElectricityConsumptionForFloor {
  datasets: ChartDataSets[];
  options: ChartOptions;
  labels: Label[] = [];
  chartType: ChartType;


  constructor(data) {
    this.options = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {xAxes: [{}], yAxes: [{}]},
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };

    this.chartType = 'bar';

    this.prepareDatasets(data);
  }

  private prepareDatasets(data): void {
    this.datasets = [
      {data: [], label: 'Energy consumption'},
      {data: [], label: 'Energy cost'},
      {data: [], label: 'Occupied time'}
    ];

    data.energyPerSpot.forEach(item => {
      this.datasets[0].data.push(item.energyConsumption);
      this.datasets[1].data.push(item.energyCost);
      this.datasets[2].data.push(item.occupiedTime);
      this.labels.push('Spot ' + item.spot);
    });
  }
}
