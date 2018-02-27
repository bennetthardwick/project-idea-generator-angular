import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  options: any;
  data: any;


  constructor() {
    this.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function (d) {
          return d.key;
        },
        y: function (d) {
          return d.y;
        },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };

    this.data = [
      {
        key: "P60-1",
        y: 256
      },
      {
        key: "P60-2",
        y: 445
      },
      {
        key: "P40",
        y: 225
      },
      {
        key: "P73",
        y: 127
      },
      {
        key: "P71",
        y: 128
      }
    ];
  }
}


