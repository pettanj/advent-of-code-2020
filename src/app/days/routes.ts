import { Routes } from '@angular/router';
import { Day1Component } from './day1/day1.component';
import { Day2Component } from './day2/day2.component';
import { Day3Component } from './day3/day3.component';

export const dayRoutes: Routes = [
  {path: 'day-1', component: Day1Component},
  {path: 'day-2', component: Day2Component},
  {path: 'day-3', component: Day3Component},
];
