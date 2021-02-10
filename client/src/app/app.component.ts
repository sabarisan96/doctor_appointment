import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kgisl';
  selectedColor = '';

  colors = [
    {
      name: 'yellow',
      value: '#ffff00'
    },
    {
      name: 'red',
      value: '#ff3300'
    },
    {
      name: 'blue',
      value: '#0000ff'
    }
  ];

  onChange(value:any){
    this.selectedColor = value;
  }


}
