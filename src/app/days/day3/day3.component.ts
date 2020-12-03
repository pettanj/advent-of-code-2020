import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day3.input';
import * as _ from 'lodash';

interface Coordinate {
  x: number;
  y: number;
}

interface Slope {
  down: number;
  right: number;
}

@Component({
  selector: 'app-day2',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day3Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 3';
  input = input1;
  result: Result = super.result;


  formatInput(input: string): string[][] {
    return input.split('\n').map(x => x.split(''));
  }

  private extendPuzzle(puzzle: string[][], yVal: number): string[][] {
    const puzzleCopy = _.cloneDeep(puzzle);
    for (let i = yVal; i < puzzleCopy.length; i++) {
      puzzleCopy[i] = puzzleCopy[i].concat(this.puzzle[i]);
    }
    return puzzleCopy;
  }

  part1(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    const result: ResultItem = { value: this.parse(puzzle, { x: 0, y: 0 }, { down: 1, right: 3 }), time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  parse(puzzle: string[][], start: Coordinate, slope: Slope): number {
    let treeCount = 0;
    let j = start.x;
    for (let i = start.y; i < puzzle.length; i += slope.down) {
      if ((j + slope.right) > puzzle[i].length) {
        puzzle = this.extendPuzzle(puzzle, i);
      }
      if (puzzle[i][j] === '#') {
        treeCount++;
      }
      j += slope.right;
    }
    return treeCount;
  }

  part2(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    const treeCounts: number[] = [
      this.parse(puzzle, { x: 0, y: 0 }, { right: 1, down: 1 }),
      this.parse(puzzle, { x: 0, y: 0 }, { right: 3, down: 1 }),
      this.parse(puzzle, { x: 0, y: 0 }, { right: 5, down: 1 }),
      this.parse(puzzle, { x: 0, y: 0 }, { right: 7, down: 1 }),
      this.parse(puzzle, { x: 0, y: 0 }, { right: 1, down: 2 }),
    ];

    const count = treeCounts.reduce((a, b) => a * b);
    const result: ResultItem = {
      value: count,
      time: 0,
      extraInfo: treeCounts.join(', ')
    };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
