import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeneratorFormComponent} from './generator-form/generator-form.component';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
  {path: '', component: GeneratorFormComponent},
  {path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
