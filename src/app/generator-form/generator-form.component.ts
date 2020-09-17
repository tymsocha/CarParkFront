import {Component} from '@angular/core';
import {StatisticsService} from '../statistics/statistics.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-generator-form',
  templateUrl: './generator-form.component.html',
  styleUrls: ['./generator-form.component.css']
})
export class GeneratorFormComponent {

  generatorForm: FormGroup;
  isLoading = false;

  constructor(
    private statisticsService: StatisticsService,
    private router: Router
  ) {
    this.generatorForm = new FormGroup({
      floors: new FormControl('', Validators.required),
      spots: new FormControl('', Validators.required)
    });
  }

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
