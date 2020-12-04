import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Day1Component } from './day1/day1.component';
import { Day2Component } from './day2/day2.component';
import { Day3Component } from './day3/day3.component';
import { Day4Component } from './day4/day4.component';

@NgModule({
  declarations: [
    Day1Component,
    Day2Component,
    Day3Component,
    Day4Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  providers: [],
})
export class DaysModule { }