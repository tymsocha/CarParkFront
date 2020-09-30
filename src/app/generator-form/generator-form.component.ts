import {Component} from '@angular/core';
import {StatisticsService} from '../statistics/statistics.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

//Jest to Komponent angulara, który łączy elementy html (templateUrl), css (styleUrl) i kod typescript, który poswstał na bazie JavaScriptu
//Selector - odwołanie do tego komponentu w innych komponentach (W tej aplikacji zajmuje się tym moduł app-routing.module.ts
@Component({
  selector: 'app-generator-form',
  templateUrl: './generator-form.component.html',
  styleUrls: ['./generator-form.component.css']
})
export class GeneratorFormComponent {

  //Pola komponentu
  //generatorForm pole typu FormControl - pole, majęce mieć wartości danych wpisanych przez użytkownika
  generatorForm: FormGroup;
  isLoading = false;

  //Konstruktor klasy, czyli metoda wywoływana przy tworzeniu obiektu na podstawie tej klasy
  constructor(
    private statisticsService: StatisticsService,
    private router: Router
  ) {
    this.generatorForm = new FormGroup({
      floors: new FormControl('', Validators.required),
      spots: new FormControl('', Validators.required)
    });
  }

  //Metoda przekazującego do serwisu StatisticsSrvice wartości wprowadzone do pierwszego formularza
  //Wywołanie następuje po kliknięciu przycisku
  submit(): void {
    this.isLoading = true;
    this.statisticsService.generateCarPark(this.generatorForm.value.floors, this.generatorForm.value.spots)
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/statistics']).then();
      }, () => {
        this.isLoading = false;
      });
  }

}
