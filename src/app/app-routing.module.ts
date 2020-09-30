import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GeneratorFormComponent} from './generator-form/generator-form.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {GeneratorGuard} from './guards/generator.guard';
import {StatisticsGuard} from './guards/statistics.guard';

//Scieżki do jakich przekierowywuje użytkownika router
const routes: Routes = [
  {path: '', component: GeneratorFormComponent, canActivate: [GeneratorGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [StatisticsGuard]},
  {path: '*', redirectTo: ''}
];

//Moduł - jest to część komponentu, w której wskazywane są inne moduły i komponenty, które są używane w danym komponencie
//W tym przypadku jest to moduł mówiący o konfiguracji Routera służącego do przekierowywania między stronami
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
