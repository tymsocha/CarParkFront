import {Component} from '@angular/core';
import {StatisticsService} from '../statistics/statistics.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  //Excel fields
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

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
    if (!this.generatorForm.invalid) {
      this.statisticsService.generateCarPark(this.generatorForm.value.floors, this.generatorForm.value.spots)
        .subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/statistics']).then();
        }, () => {
          this.isLoading = false;
        });
    } else {
      this.upload();
    }
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.statisticsService.upload(this.currentFile).subscribe(
      () => {
        this.router.navigate(['/statistics']).then();
        this.isLoading = false;
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

}
