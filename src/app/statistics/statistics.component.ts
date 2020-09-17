import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {StatisticsService} from './statistics.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {ElectricityConsumptionForFloor} from '../classes/electricity-consumption-for-floor';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  step = 0;
  dailySalaryForm: FormGroup;
  electricityConsumptionForCarParkForm: FormGroup;
  electricityConsumptionForFloorForm: FormGroup;
  electricityConsumptionForSpotForm: FormGroup;

  electricityConsumptionForFloorChart: ElectricityConsumptionForFloor;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.generateForms();
  }

  generateForms(): void {
    this.dailySalaryForm = new FormGroup({
      hourlySalary: new FormControl('', Validators.required),
      spots: new FormControl('', Validators.required)
    });

    this.electricityConsumptionForCarParkForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      cost: new FormControl('', Validators.required),
      energyConsumption: new FormControl('', Validators.required)
    });

    this.electricityConsumptionForFloorForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      cost: new FormControl('', Validators.required),
      energyConsumption: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required)
    });

    this.electricityConsumptionForSpotForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      cost: new FormControl('', Validators.required),
      energyConsumption: new FormControl('', Validators.required),
      spot: new FormControl('', Validators.required)
    });
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  getElectricityConsumptionForCarPark(): void {
    this.statisticsService.getElectricityConsumptionForCarPark(
      this.electricityConsumptionForCarParkForm.value.cost,
      this.electricityConsumptionForCarParkForm.value.energyConsumption,
      this.electricityConsumptionForCarParkForm.value.startDate,
      this.electricityConsumptionForCarParkForm.value.endDate
    )
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  getElectricityConsumptionForFloor(): void {
    this.statisticsService.getElectricityConsumptionForFloor(
      this.electricityConsumptionForFloorForm.value.cost,
      this.electricityConsumptionForFloorForm.value.energyConsumption,
      this.electricityConsumptionForFloorForm.value.floor,
      this.electricityConsumptionForFloorForm.value.startDate,
      this.electricityConsumptionForFloorForm.value.endDate
    )
      .subscribe(response => {
        console.log(response);
        this.electricityConsumptionForFloorChart = new ElectricityConsumptionForFloor(response);
      }, error => {
        console.log(error);
      });
  }


  getElectricityConsumptionForSpot(): void {
    this.statisticsService.getElectricityConsumptionForSpot(
      this.electricityConsumptionForSpotForm.value.cost,
      this.electricityConsumptionForSpotForm.value.energyConsumption,
      this.electricityConsumptionForSpotForm.value.spot,
      this.electricityConsumptionForSpotForm.value.startDate,
      this.electricityConsumptionForSpotForm.value.endDate
    )
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  getNumberOfEmployeesForFloorsAndTheirDailySalary(): void {
    this.statisticsService.getNumberOfEmployeesForFloorsAndTheirDailySalary(
      this.dailySalaryForm.value.hourlySalary,
      this.dailySalaryForm.value.spots
    )
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

}
