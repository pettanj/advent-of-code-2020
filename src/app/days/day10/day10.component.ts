import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day10.input';
import * as _ from 'lodash';

@Component({
  selector: 'app-day10',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day10Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 10';
  input = input1;
  result: Result = super.result;
  cache = new Map();

  formatInput(input: string): number[] {
    return input.split('\n').map(x => parseInt(x, 10));
  }

  part1(): void {
    const start = new Date();
    let puzzle = _.cloneDeep(this.puzzle);
    let ones = 0;
    let threes = 0;
    puzzle = puzzle.sort((a: number, b: number) => a - b);
    puzzle.push(puzzle[puzzle.length -1] + 3);
    if ([puzzle[1] === 1]) {ones++};
    if ([puzzle[1] === 3]) {threes++};
    for (let i = 0; i < puzzle.length - 2; i++) {
      if (puzzle[i + 1] - puzzle[i] === 1) {
        ones ++;
      } else if (puzzle[i + 1] - puzzle[i] === 3) {
        threes ++;
      }
    }
    const result: ResultItem = { value: ones * threes, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  solve2(list: number[]): number {
    let current = list[0]; 
    if (list.length === 1) {
      return 1;
    }
    let index = 1;
    let arrangements = 0;
    while (list.length > index && list[index] - current < 4) {
      let remainingList = list.slice(index);
      let remainingStr = remainingList.join('');
      if (this.cache.has(remainingStr)) {
        arrangements += this.cache.get(remainingStr);
      } else {
        let subArrangements = this.solve2(remainingList);
        this.cache.set(remainingStr, subArrangements);
        arrangements += subArrangements;
      }
      index ++;
    }
    return arrangements;
  }

  part2(): void {
    const start = new Date();
    let puzzle = _.cloneDeep(this.puzzle);
    let val = 0;
    puzzle = puzzle.sort((a: number, b: number) => a - b);
    puzzle = [0].concat(puzzle);
    puzzle.push(puzzle[puzzle.length - 1] + 3);
    this.cache = new Map();
    val = this.solve2(puzzle);
    const result: ResultItem = { value: val, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
