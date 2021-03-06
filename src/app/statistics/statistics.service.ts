import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

//Serwis służący do komunikacji z aplikacją serwerową
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  //Konstruktor klasy, czyli metoda wywoływana przy tworzeniu obiektu na podstawie tej klasy
  constructor(private readonly http: HttpClient) {
  }

  //Główny url aplikacji serwerowej
  private url = 'http://localhost:8080/';

  //Metoda pytająca serwer czy dane są wygenerowana
  public checkIfCarParkGenerated(): Observable<any> {
    return this.http.get(this.url + 'check');
  }

  //Metoda przesyłająca do serwera dane z formularza, do endpointa generującego dane
  public generateCarPark(floors: number, spots: number): Observable<any> {
    return this.http.post(this.url + 'floor/' + floors + '/spots/' + spots, {});
  }

  //Metoda wysyłająca zapytanie do serwera o statystyki zużycia energii i przekazująca dane z serweraje dalej
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

  //Metoda wysyłająca zapytanie do serwera o statystyki zużycia energii na piętro i przekazująca dane z serweraje dalej
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

    return this.http.get(this.url + 'energyConsumption/floor/' + floor, {params});
  }

  //Metoda wysyłająca zapytanie do serwera o statystyki zużycia energii na miejsce i przekazująca dane z serweraje dalej
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

  //Metoda wysyłająca zapytanie do serwera o statystyki kosztów utrzymania parkingu
  public getNumberOfEmployeesForFloorsAndTheirDailySalary(spots: number, hourlySalary: number): Observable<any> {
    const params = new HttpParams()
      .set('hourlySalary', hourlySalary.toString(10));

    return this.http.get(this.url + 'employees/spots/' + spots, {params});
  }

  //Metoda wysyłająca zapytanie do serwera o czas w jakim dane miejsca były zajęte i przekazująca dane z serweraje dalej
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

    return this.http.get(this.url + 'occupation/floor/' + floor, {params});
  }

  //Metoda wysyłająca zapytanie do serwera o listę miejsc zajętych w danym czasie i przekazująca dane z serweraje dalej
  public getSpotsOccupiedInTimePeriod(
    time: string,
    floor?: number): Observable<any> {

    let params = new HttpParams()
      .set('timeString', time);

    if (floor || floor === 0) {
      params = params.set('floor', floor.toString(10));
    }

    return this.http.get(this.url + 'occupiedSlots', {params});
  }

  public closeTheFloor(
    floor: number,
    start: string,
    end: string): Observable<any> {

    let params = new HttpParams();
    params = params.set('startDate', start);
    params = params.set('endDate', end);

    return this.http.post(this.url + 'close/' + floor, params);
  }

  public getFloorsAverageOccupationTime(): Observable<any> {
    return this.http.get(this.url + 'floorsAverage');
  }

  public getCarParkAverageOccupationTime(): Observable<any> {
    return this.http.get(this.url + 'carParkAverage');
  }

  public generateExcel(): Observable<any> {
    return this.http.get(this.url + 'excel', {responseType: 'blob'});
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.url + 'excel', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
