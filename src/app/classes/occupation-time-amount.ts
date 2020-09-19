import {Chart} from './chart';

export class OccupationTimeAmount extends Chart {
  constructor(data) {
    super();
    this.prepareDatasets(data);
  }

  private prepareDatasets(data): void {
    this.datasets = [
      {data: [], label: 'Occupied time'}
    ];

    data.forEach(item => {
      this.datasets[0].data.push(item.occupiedTime);
      this.labels.push('Spot ' + item.slotName);
    });
  }
}
