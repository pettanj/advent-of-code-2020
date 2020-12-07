import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day5.input';
import * as _ from 'lodash';

interface Seat {
  rowStr: string;
  rowValue: number;
  colStr: string;
  colValue: number;
  id: number;
}

@Component({
  selector: 'app-day2',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day5Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 5';
  input = input1;
  result: Result = super.result;

  formatInput(input: string): any[] {
    return input.split('\n').map(x => {
      return {
        rowStr: x.substring(0, 7),
        rowValue: 0,
        colStr: x.substring(7),
        colValue: 0,
      };
    });
  }

  getSeatValue(list: string[], lowerVal: string, higherVal: string, start: number, end: number): number {
    let val = 0;
    list.forEach(item => {
      if (item === lowerVal) {
        end = Math.floor((start + end) / 2);
      } else {
        start = Math.ceil((start + end) / 2);
      }
    });
    if (list[list.length - 1] === lowerVal) {
      val = start;
    } else {
      val = end;
    }
    return val;
  }

  calculateRowAndCol_1(seat: Seat): Seat {
    seat.rowValue = this.getSeatValue(seat.rowStr.split(''), 'F', 'B', 0, 127);
    seat.colValue = this.getSeatValue(seat.colStr.split(''), 'L', 'R', 0, 7);
    return seat;
  }

  calculateRowAndCol_2(seat: Seat): Seat {
    seat.rowValue = this.getSeatValue(seat.rowStr.split(''), 'F', 'B', 0, 127);
    seat.colValue = this.getSeatValue(seat.colStr.split(''), 'L', 'R', 0, 7);
    return seat;
  }

  parse_1(puzzle: Seat[]): number {
    let largest = 0;
    puzzle.forEach(item => {
      const seat = this.calculateRowAndCol_1(item);
      seat.id = (seat.rowValue * 8) + seat.colValue;
      if (seat.id > largest) {
        largest = seat.id;
      }
    });
    return largest;
  }

  getSeatById(list: Seat[], id: number): Seat | undefined {
    const filtered = list.filter((x: Seat) => x.id === id);
    return filtered.length > 0 ? filtered.pop() : undefined;
  }

  parse_2(puzzle: Seat[]): number {
    let mySeat = 0;
    const list = puzzle.map(item => {
      const seat = this.calculateRowAndCol_2(item);
      seat.id = (seat.rowValue * 8) + seat.colValue;
      return seat.id;
    });
    for (let k = 0; k < list.length - 1; k++) {
      if (!list.includes(list[k] + 1) && list.includes(list[k] + 2)) {
        mySeat = list[k] + 1;
      }
    }
    return mySeat;
  }

  part1(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    const result: ResultItem = { value: this.parse_1(puzzle), time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    const result: ResultItem = { value: this.parse_2(puzzle), time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
