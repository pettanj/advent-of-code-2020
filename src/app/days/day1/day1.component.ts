import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result} from '../day-base/day-base.component';
import { input1 } from './day1.input';


@Component({
  selector: 'app-day1',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day1Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 1';
  input = input1;
  result: Result = super.result;

  formatInput(input: string): number[] {
    return input.split('\n').map((x) => parseInt(x, 10));
  }

  part1(): void {
    const start = new Date();
    const puzzle = Object.assign(this.puzzle);
    const result: ResultItem = {value: null, time: 0};
    puzzle.forEach((x: number, i: number, array: number[]) => {
      const multiplyer =  this.check2020_1(x, array);
      if (multiplyer) {
        result.value = multiplyer * x;
        result.extraInfo = x + ', ' + multiplyer;
      }
    });
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = Object.assign(this.puzzle);
    const result: ResultItem = {value: null, time: 0};
    puzzle.forEach((x: number, i: number, array: number[]) => {
      const multiplyer =  this.check2020_2(x, array);
      if (multiplyer) {
        result.value = multiplyer * x;
      }
    });
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }

  private check2020_1(num: number, list: number[]): number | null {
    const result = list.find((x) => (x + num) === 2020);
    return result ? result : null;
  }

  private check2020_2(num: number, list: number[]): number | null {
    let result = null;
    let mult = 0;
    list.forEach((x) => {
      const tmp = this.check2020_1(x + num, list);
      if (tmp !== null) {
        result = tmp;
        mult = x;
      }
    });
    return result ? (result * mult) : null;
  }
}
