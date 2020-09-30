import {Chart} from './chart';

//Klasa pokazująca wykres zużycia energii dla całego parkingu, dziedzicząca po klasie Chart
export class ElectricityConsumptionForCarPark extends Chart {
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
    ];

    data.floors.forEach((item, index) => {
      this.datasets[0].data.push(item.totalEnergyConsumption);
      this.datasets[1].data.push(item.totalEnergyCost);
      this.labels.push('Floor ' + index);
    });
  }
}
