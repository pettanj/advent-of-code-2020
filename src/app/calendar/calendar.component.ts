import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { dayRoutes } from '../days/routes';

interface Day {
  route: Route;
  name?: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() {
    this.dayRoutes = dayRoutes.map((r, index) => {
      return {
        route: r,
        name: (index + 1).toString()
      };
    });
  }

  dayRoutes: Day[];

  ngOnInit(): void {
  }

}
