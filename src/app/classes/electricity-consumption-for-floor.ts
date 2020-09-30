import {Chart} from './chart';

//Klasa pokazująca wykres zużycia energii dla piętra, dziedzicząca po klasie Chart
export class ElectricityConsumptionForFloor extends Chart {
  totalEnergyConsumption: number;
  totalEnergyCost: number;

  //Konstruktor klasy, czyli metoda wywoływana przy tworzeniu obiektu na podstawie tej klasy
  constructor(data) {
    super();
    this.prepareDatasets(data);
    this.totalEnergyConsumption = data.totalEnergyConsumption;
    this.totalEnergyCost = data.totalEnergyCost;
  }

  //Metoda przygotowywująca dane do wyświetlenie na wykresie
  private prepareDatasets(data): void {
    this.datasets = [
      {data: [], label: 'Energy consumption in kWh'},
      {data: [], label: 'Energy cost in PLN'},
      {data: [], label: 'Occupied time in hours'}
    ];

    data.energyPerSpot.forEach(item => {
      this.datasets[0].data.push(item.energyConsumption);
      this.datasets[1].data.push(item.energyCost);
      this.datasets[2].data.push(item.occupiedTime);
      this.labels.push('Spot ' + item.spot);
    });
  }
}
