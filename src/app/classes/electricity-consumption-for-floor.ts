import {Chart} from './chart';

export class ElectricityConsumptionForFloor extends Chart {
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
