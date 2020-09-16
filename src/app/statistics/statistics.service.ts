import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private readonly http: HttpClient) {
  }

  private url = 'http://localhost:8080/';

  public generateCarPark(floors: number, spots: number): Observable<any> {
    return this.http.post(this.url + 'floor/' + floors + '/spots/' + spots, {});
  }

}
