import {Chart} from './chart';

export class ElectricityConsumptionForCarPark extends Chart {
  totalEnergyConsumption: number;
  totalEnergyCost: number;

  constructor(data) {
    super();
    this.prepareDatasets(data);
    this.totalEnergyConsumption = data.totalEnergyConsumption;
    this.totalEnergyCost = data.totalEnergyCost;
  }

  private prepareDatasets(data): void {
    this.datasets = [
      {data: [], label: 'Energy consumption'},
      {data: [], label: 'Energy cost'},
    ];

    data.floors.forEach((item, index) => {
      this.datasets[0].data.push(item.totalEnergyConsumption);
      this.datasets[1].data.push(item.totalEnergyCost);
      this.labels.push('Floor ' + index);
    });
  }
}
