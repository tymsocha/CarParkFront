import {Chart} from './chart';

export class ElectricityConsumptionForSpot extends Chart {


  constructor(data) {
    super();
    this.prepareDatasets(data);
  }

  private prepareDatasets(data): void {
    this.datasets = [
      {data: [], label: 'Energy consumption'},
      {data: [], label: 'Energy cost'},
      {data: [], label: 'Occupied time'}
    ];

    this.datasets[0].data.push(data.energyConsumption);
    this.datasets[1].data.push(data.energyCost);
    this.datasets[2].data.push(data.occupiedTime);
    this.labels.push('Spot ' + data.spot);
  }
}
