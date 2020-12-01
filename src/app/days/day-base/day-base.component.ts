import { Component, OnInit } from '@angular/core';

export interface ResultItem {
  value: number | null;
  time: any;
  extraInfo?: string;
}

export interface Result {
  first: ResultItem;
  second: ResultItem;
}

@Component({
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})

export class DayBaseComponent implements OnInit {
  constructor(){}
  input!: string;
  name!: string;
  puzzle: any;
  result: Result = {
    first: {
      value: null,
      time: 0
    },
    second: {
      value: null,
      time: 0
    }
  };

  ngOnInit(): void {
    this.puzzle = this.formatInput(this.input);
  }
  formatInput(input: string): any {}
  calculate(): void {
    this.clear();
    if (typeof this.part1 === 'function') {
      this.part1();
    }
    if (typeof this.part2 === 'function') {
      this.part2();
    }
  }
  part1(): void {}
  part2(): void {}
  clear(): void {
    this.result = {
      first: {
        value: null,
        time: 0
      },
      second: {
        value: null,
        time: 0
      }
    };
  }
}
