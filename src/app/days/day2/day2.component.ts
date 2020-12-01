import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result} from '../day-base/day-base.component';
import { input1 } from './day2.input';


@Component({
  selector: 'app-day2',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day2Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 2';
  input = input1;
  result: Result = super.result;

  formatInput(input: string): number[] {
    return [];
  }

  part1(): void {
    const start = new Date();
    const puzzle = Object.assign(this.puzzle);
    const result: ResultItem = {value: null, time: 0};
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = Object.assign(this.puzzle);
    const result: ResultItem = {value: null, time: 0};
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
