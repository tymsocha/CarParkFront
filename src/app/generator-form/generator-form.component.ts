import { Component } from '@angular/core';

@Component({
  selector: 'app-generator-form',
  templateUrl: './generator-form.component.html',
  styleUrls: ['./generator-form.component.css']
})
export class GeneratorFormComponent {
  flag = true;

  constructor() { }

  setFlag(): void {
    this.flag = false;
  }

}
