import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day6.input';
import * as _ from 'lodash';

@Component({
  selector: 'app-day2',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day6Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 6';
  input = input1;
  result: Result = super.result;

  formatInput(input: string): string[][][] {
    return input.split(/\n\s*\n/).map(x => x.split('\n').map(y => y.split('')));
  }

  part1(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    let count = 0;
    puzzle.forEach((group: string[][]) => {
      const yesAnswers: string[] = [];
      group.forEach((person: string[]) => {
        person.forEach((c: string) => {
          if (!yesAnswers.includes(c)) {
            yesAnswers.push(c);
          }
        });
      });
      count += yesAnswers.length;
    });
    const result: ResultItem = { value: count, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    let count = 0;
    puzzle.forEach((group: string[][]) => {
      const yesAnswers: any = {};
      const list: string[] = [];
      group.forEach((person: string[]) => {
        person.forEach((c: string) => {
          if (yesAnswers[c]) {
            yesAnswers[c]++;
          } else {
            yesAnswers[c] = 1;
          }
        });
        for (const [key, value] of Object.entries(yesAnswers)) {
          if (value === group.length) {
            list.push(key);
          }
        }
      });
      count += list.length;
    });
    const result: ResultItem = { value: count, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
