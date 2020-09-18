import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private readonly http: HttpClient) {
  }

  private url = 'http://localhost:8080/';

  public checkIfCarParkGenerated(): Observable<any> {
    return this.http.get(this.url + 'check');
  }

  public generateCarPark(floors: number, spots: number): Observable<any> {
    return this.http.post(this.url + 'floor/' + floors + '/spots/' + spots, {});
  }

  public getElectricityConsumptionForCarPark(
    cost: number,
    energyConsumption: number,
    startDate?: string,
    endDate?: string): Observable<any> {
    let params = new HttpParams()
      .set('cost', cost.toString(10))
      .set('energyConsumption', energyConsumption.toString(10));

    if (startDate) {
      params = params.set('startDate', startDate);
    }

    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(this.url + 'energyConsumption', {params});
  }

  public getElectricityConsumptionForFloor(
    cost: number,
    energyConsumption: number,
    floor: number,
    startDate?: string,
    endDate?: string): Observable<any> {

    let params = new HttpParams()
      .set('cost', cost.toString(10))
      .set('energyConsumption', energyConsumption.toString(10));

    if (startDate) {
      params = params.set('startDate', startDate);
    }

    if (endDate) {
      params = params.set('endDate', endDate);
    }

    console.log('params', params);
    return this.http.get(this.url + 'energyConsumption/floor/' + floor, {params});
  }

  public getElectricityConsumptionForSpot(
    cost: number,
    energyConsumption: number,
    spot: string,
    startDate?: string,
    endDate?: string): Observable<any> {

    let params = new HttpParams()
      .set('cost', cost.toString(10))
      .set('energyConsumption', energyConsumption.toString(10));

    if (startDate) {
      params = params.set('startDate', startDate);
    }

    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(this.url + 'energyConsumption/spot/' + spot, {params});
  }

  public getNumberOfEmployeesForFloorsAndTheirDailySalary(spots: number, hourlySalary: number): Observable<any> {
    const params = new HttpParams()
      .set('hourlySalary', hourlySalary.toString(10));

    return this.http.get(this.url + 'employees/spots/' + spots, {params});
  }

  public getOccupationTimeAmount(
    floor: number,
    startDate?: string,
    endDate?: string): Observable<any> {

    let params = new HttpParams();

    if (startDate) {
      params = params.set('startDate', startDate);
    }

    if (endDate) {
      params = params.set('endDate', endDate);
    }
    console.log('params', params);

    return this.http.get(this.url + 'occupation/floor/' + floor, {params});
  }

  public getSpotsOccupiedInTimePeriod(
    time: string,
    floor?: number): Observable<any> {

    let params = new HttpParams()
      .set('timeString', time);

    if (floor) {
      params = params.set('floor', floor.toString(10));
    }

    return this.http.get(this.url + 'occupiedSlots', {params});
  }

}
