import { NgModule } from '@angular/core';

import { GeneratorFormComponent } from './generator-form.component';
import {StatisticsComponent} from '../statistics/statistics.component';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
  ],
  providers: [],
  bootstrap: [GeneratorFormComponent]
})
export class GeneratorFormModule { }

