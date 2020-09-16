import {Component} from '@angular/core';
import {StatisticsService} from '../statistics/statistics.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {closeCalendar} from '@angular/material/datepicker/testing/datepicker-trigger-harness-base';

@Component({
  selector: 'app-generator-form',
  templateUrl: './generator-form.component.html',
  styleUrls: ['./generator-form.component.css']
})
export class GeneratorFormComponent {

  generatorForm: FormGroup;

  constructor(
    private statisticsService: StatisticsService,
  ) {
    this.generatorForm = new FormGroup({
      floors: new FormControl('', Validators.required),
      spots: new FormControl('', Validators.required)
    });
  }

  setFlag(): void {
    this.statisticsService.generateCarPark(this.generatorForm.value.floors, this.generatorForm.value.spots)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

}
