import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result} from '../day-base/day-base.component';
import { input1 } from './day2.input';

interface Policy {
  letter: string;
  min: number;
  max: number;
}

interface PuzzleItem {
  password: string;
  policy: Policy;
}

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

  formatInput(input: string): PuzzleItem[] {
    return input.split('\n').map(row => this.createPuzzleItem(row));
  }

  createPuzzleItem(row: string): PuzzleItem {
    const [policyString, password] = row.split(': ');
    const [minMax, letter] = policyString.split(' ');
    const [min, max] = minMax.split('-').map(x => parseInt(x, 10));
    return {password, policy: {letter, min, max}};
  }

  private validatePassword_1(puzzleItem: PuzzleItem): boolean {
    let count = 0;
    puzzleItem.password.split('').forEach(x => {
      if (x === puzzleItem.policy.letter) {
        count ++;
      }
    });
    return count >= puzzleItem.policy.min && count <= puzzleItem.policy.max;
  }

  private validatePassword_2(puzzleItem: PuzzleItem): boolean {
    const pwList = puzzleItem.password.split('');
    const minIsLetter = (pwList[puzzleItem.policy.min - 1] === puzzleItem.policy.letter);
    const maxIsLetter = (pwList[puzzleItem.policy.max - 1] === puzzleItem.policy.letter);
    return (minIsLetter && !maxIsLetter) || (!minIsLetter && maxIsLetter);
  }

  part1(): void {
    const start = new Date();
    const puzzle = Object.assign(this.puzzle);
    const result: ResultItem = {value: puzzle.filter((x: PuzzleItem) => this.validatePassword_1(x)).length, time: 0};
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = Object.assign(this.puzzle);
    const result: ResultItem = {value: puzzle.filter((x: PuzzleItem) => this.validatePassword_2(x)).length, time: 0};
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
