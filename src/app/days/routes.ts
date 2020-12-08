import { Routes } from '@angular/router';
import { Day1Component } from './day1/day1.component';
import { Day2Component } from './day2/day2.component';
import { Day3Component } from './day3/day3.component';
import { Day4Component } from './day4/day4.component';
import { Day5Component } from './day5/day5.component';
import { Day6Component } from './day6/day6.component';
import { Day7Component } from './day7/day7.component';
import { Day8Component } from './day8/day8.component';

export const dayRoutes: Routes = [
  {path: 'day-1', component: Day1Component},
  {path: 'day-2', component: Day2Component},
  {path: 'day-3', component: Day3Component},
  {path: 'day-4', component: Day4Component},
  {path: 'day-5', component: Day5Component},
  {path: 'day-6', component: Day6Component},
  {path: 'day-7', component: Day7Component},
  {path: 'day-8', component: Day8Component},
];
