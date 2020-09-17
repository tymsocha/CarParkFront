import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StatisticsService} from '../statistics/statistics.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsGuard implements CanActivate {
  constructor(private statisticsService: StatisticsService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this
      .statisticsService
      .checkIfCarParkGenerated()
      .pipe(
        map(response => {
          if (!response) {
            this.router.navigate(['/']).then();
          }
          return response;
        }),
        catchError(err => of(false))
      );

  }
}
