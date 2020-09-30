import {Chart} from './chart';

//Klasa pokazująca wykres zużycia energii dla jednego miejsca, dziedzicząca po klasie Chart
export class ElectricityConsumptionForSpot extends Chart {

  //Konstruktor klasy, czyli metoda wywoływana przy tworzeniu obiektu na podstawie tej klasy
  constructor(data) {
    super();
    this.prepareDatasets(data);
  }

  //Metoda przygotowywująca dane do wyświetlenie na wykresie
  private prepareDatasets(data): void {
    this.datasets = [
      {data: [], label: 'Energy consumption in kWh'},
      {data: [], label: 'Energy cost in PLN'},
      {data: [], label: 'Occupied time in hours'}
    ];

    this.datasets[0].data.push(data.energyConsumption);
    this.datasets[1].data.push(data.energyCost);
    this.datasets[2].data.push(data.occupiedTime);
    this.labels.push('Spot ' + data.spot);
  }
}
