import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day9.input';
import * as _ from 'lodash';

@Component({
  selector: 'app-day9',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day9Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 9';
  input = input1;
  result: Result = super.result;

  formatInput(input: string): number[] {
    return input.split('\n').map(x => parseInt(x, 10));
  }

  validValue(preamble: number[], val: number): boolean {
    let result = false;
    for (const x of preamble) {
      for (const y of preamble) {
        if (x !== y && (x + y === val)) {
          result = true;
          return result;
        }
      }
    }
    return result;
  }

  part1(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    let notValid;
    for (let i = 25; i < puzzle.length - 1; i++) {
      const preamble = puzzle.slice(i - 25, i);
      if (!this.validValue(preamble, puzzle[i])) {
        notValid = puzzle[i];
        break;
      }
    }
    const result: ResultItem = { value: notValid, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    let val = null;
    puzzle.forEach((a: number, index: number) => {
      const values = [a];
      for (const b of puzzle.slice(index + 1)) {
        values.push(b);
        a += b;
        if (a === this.result.first.value) {
          val = Math.min(...values) + Math.max(...values);
          break;
        }
        if (this.result.first.value && a > this.result.first.value) {
          break;
        }
      }
    });
    const result: ResultItem = { value: val, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
