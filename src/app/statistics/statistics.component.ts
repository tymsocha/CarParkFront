import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {StatisticsService} from './statistics.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {ElectricityConsumptionForFloor} from '../classes/electricity-consumption-for-floor';
import {OccupationTimeAmount} from '../classes/occupation-time-amount';
import {ElectricityConsumptionForCarPark} from '../classes/electricity-consumption-for-car-park';
import {ElectricityConsumptionForSpot} from '../classes/electricity-consumption-for-spot';

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
  occupationTimeAmountForm: FormGroup;
  spotsOccupiedInTimePeriodForm: FormGroup;

  electricityConsumptionForFloorChart: ElectricityConsumptionForFloor;
  occupationTimeAmountChart: OccupationTimeAmount;
  electricityConsumptionForCarParkChart: ElectricityConsumptionForCarPark;
  electricityConsumptionForSpotChart: ElectricityConsumptionForSpot;
  spotsOccupiedInTimePeriodData: string[];

  timeModel;

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

    this.occupationTimeAmountForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      floor: new FormControl('', Validators.required)
    });

    this.spotsOccupiedInTimePeriodForm = new FormGroup({
      time: new FormControl('', Validators.required),
      floor: new FormControl('')
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
      this.getCorrectDate(this.electricityConsumptionForCarParkForm.value.startDate),
      this.getCorrectDate(this.electricityConsumptionForCarParkForm.value.endDate)
    )
      .subscribe(response => {
        this.electricityConsumptionForCarParkChart = new ElectricityConsumptionForCarPark(response);
      }, error => {
      });
  }

  getElectricityConsumptionForFloor(): void {
    this.statisticsService.getElectricityConsumptionForFloor(
      this.electricityConsumptionForFloorForm.value.cost,
      this.electricityConsumptionForFloorForm.value.energyConsumption,
      this.electricityConsumptionForFloorForm.value.floor,
      this.getCorrectDate(this.electricityConsumptionForFloorForm.value.startDate),
      this.getCorrectDate(this.electricityConsumptionForFloorForm.value.endDate)
    )
      .subscribe(response => {
        this.electricityConsumptionForFloorChart = new ElectricityConsumptionForFloor(response);
      }, error => {
      });
  }


  getElectricityConsumptionForSpot(): void {
    this.statisticsService.getElectricityConsumptionForSpot(
      this.electricityConsumptionForSpotForm.value.cost,
      this.electricityConsumptionForSpotForm.value.energyConsumption,
      this.electricityConsumptionForSpotForm.value.spot,
      this.getCorrectDate(this.electricityConsumptionForSpotForm.value.startDate),
      this.getCorrectDate(this.electricityConsumptionForSpotForm.value.endDate)
    )
      .subscribe(response => {
        this.electricityConsumptionForSpotChart = new ElectricityConsumptionForSpot(response);
      }, error => {
      });
  }

  getNumberOfEmployeesForFloorsAndTheirDailySalary(): void {
    this.statisticsService.getNumberOfEmployeesForFloorsAndTheirDailySalary(
      this.dailySalaryForm.value.hourlySalary,
      this.dailySalaryForm.value.spots
    )
      .subscribe(response => {
      }, error => {
      });
  }

  getOccupationTimeAmount(): void {
    this.statisticsService.getOccupationTimeAmount(
      this.occupationTimeAmountForm.value.floor,
      this.getCorrectDate(this.occupationTimeAmountForm.value.startDate),
      this.getCorrectDate(this.occupationTimeAmountForm.value.endDate)
    )
      .subscribe(response => {
        this.occupationTimeAmountChart = new OccupationTimeAmount(response);
      }, error => {
      });
  }

  getSpotsOccupiedInTimePeriod(): void {
    this.statisticsService.getSpotsOccupiedInTimePeriod(
      this.getCorrectDate(this.spotsOccupiedInTimePeriodForm.value.time),
      this.spotsOccupiedInTimePeriodForm.value.floor
    )
      .subscribe(response => {
        this.spotsOccupiedInTimePeriodData = response;
      }, error => {
      });
  }

  private getCorrectDate(d: string): string {
    if (!d.length) {
      return '';
    }
    const date = new Date(d);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return new Date(date).toISOString().substr(0, 16).replace('T', ' ');
  }

}
