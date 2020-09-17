import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeneratorFormComponent} from './generator-form/generator-form.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {GeneratorGuard} from './guards/generator.guard';
import {StatisticsGuard} from './guards/statistics.guard';

const routes: Routes = [
  {path: '', component: GeneratorFormComponent, canActivate: [GeneratorGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [StatisticsGuard]},
  {path: '*', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
