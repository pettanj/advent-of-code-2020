import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day7.input';
import * as _ from 'lodash';
interface Rule {
  bag: string;
  contains: string[];
  containsSums: number[];
}

interface CountHelp {
  amount: number;
  name: string;
}
@Component({
  selector: 'app-day7',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day7Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 7';
  input = input1;
  result: Result = super.result;
  count = 0;
  count2 = 0;
  counted: any = {};
  counted2: any = {};
  formatInput(input: string): Rule[]{
    return input.split('\n').map(x => {
      let [bag, contains] = x.split(' contain ').map(y => y.split(', '));
      contains = contains.map(x => x.split('.').join(''));
      const containsSums: number[] = [];
      contains.forEach(x => {
        const tmp = parseInt(x.substring(0, 1), 10);
        containsSums.push(!isNaN(tmp) ? tmp : 0);
      });
      contains = contains.map(x => x.substring(2));
      return {bag: bag[0].slice(0, -1), contains, containsSums};
    });
  }

  recursiveCountup(list: Rule[], str: string): number {
    const bagsThatHasStr: any = {};
    list.forEach((rule: Rule) => {
      if (rule.contains.includes(str) || rule.contains.includes(str + 's')) {
        if (!this.counted[rule.bag]) {
          this.count ++;
        }
        bagsThatHasStr[rule.bag] = true;
        this.counted[rule.bag] = true;
      }
    });
    if (!_.isEqual(bagsThatHasStr, {})) {
      for (const [key, value] of Object.entries(bagsThatHasStr)) {
        this.recursiveCountup(list, key);
      }
    }
    return this.count;
  }

  recursiveCountup2(list: Rule[], str: string): number {
    let count = 1;
    list.forEach((rule: Rule) => {
      if (rule.bag === str || rule.bag + 's' === str || rule.bag === str + 's') {
        rule.contains.forEach((cont: string, index) => {
          count += rule.containsSums[index] * this.recursiveCountup2(list, cont);
        });
      }
    });
    return count;
  }

  part1(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    this.recursiveCountup(puzzle, 'shiny gold bag');
    const result: ResultItem = { value: this.count, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    const count = this.recursiveCountup2(puzzle, 'shiny gold bag');
    const result: ResultItem = { value: count - 1, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
