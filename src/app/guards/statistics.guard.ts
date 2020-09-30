import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StatisticsService} from '../statistics/statistics.service';
import {catchError, map} from 'rxjs/operators';

//Serwis powstały by sprawdzić czy dane zostały wygenerowane
//Jeśli nie są, następuje przekierowanie do strony początkowej z generatorem
@Injectable({
  providedIn: 'root'
})
export class StatisticsGuard implements CanActivate {

  //Konstruktor klasy, czyli metoda wywoływana przy tworzeniu obiektu na podstawie tej klasy
  constructor(private statisticsService: StatisticsService, private router: Router) {
  }

  //Metoda sprawdzająca wywołująca serwis i przesyłająca zapytanie do serwera czy dane zostały wygenerowane
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this
      .statisticsService
      .checkIfCarParkGenerated()
      .pipe(
        map(response => {
          //Jeśli dane nie są wygenerowane następuje przekierowanie do strony początkowej (do generatora)
          if (!response) {
            this.router.navigate(['/']).then();
          }
          return response;
        }),
        catchError(err => of(false))
      );

  }
}
