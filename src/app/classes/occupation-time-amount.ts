import {Chart} from './chart';

//Klasa pokazująca listę miejsc zajętych w danym czasie, dziedzicząca po klasie Chart
export class OccupationTimeAmount extends Chart {
  //Konstruktor klasy, czyli metoda wywoływana przy tworzeniu obiektu na podstawie tej klasy
  constructor(data) {
    super();
    this.prepareDatasets(data);
  }

  //Metoda przygotowywująca dane do wyświetlenie na wykresie
  private prepareDatasets(data): void {
    this.datasets = [
      {data: [], label: 'Occupied time in hours'}
    ];

    data.forEach(item => {
      this.datasets[0].data.push(item.occupiedTime);
      this.labels.push('Spot ' + item.slotName);
    });
  }
}
