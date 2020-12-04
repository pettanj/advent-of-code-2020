import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day4.input';
import * as _ from 'lodash';

@Component({
  selector: 'app-day2',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day4Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 4';
  input = input1;
  result: Result = super.result;

  formatInput(input: string): any[] {
    return input.split(/\n\s*\n/).map(x => {
      const passport: any = {};
      const idItems = x.split(/\s/);
      idItems.forEach(y => {
        if (y !== '') {
          const [key, value] = y.split(':');
          passport[key] = value;
        }
      });
      return passport;
    });
  }

  private validateData(type: string, field: any): boolean {
    let dataValid = true;
    if (_.isNil(field)) {
      return dataValid = false;
    }
    switch (type) {
      case 'byr': {
        const nmbrVal = parseInt(field, 10);
        if (field.length === 4 && nmbrVal >= 1920 && nmbrVal <= 2020) {
          dataValid = true;
        } else {
          dataValid = false;
        }
        break;
      }
      case 'iyr': {
        const nmbrVal = parseInt(field, 10);
        if (field.length === 4 && nmbrVal >= 2010 && nmbrVal <= 2020) {
          dataValid = true;
        } else {
          dataValid = false;
        }
        break;
      }
      case 'eyr': {
        const nmbrVal = parseInt(field, 10);
        if (field.length === 4 && nmbrVal >= 2020 && nmbrVal <= 2030) {
          dataValid = true;
        } else {
          dataValid = false;
        }
        break;
      }
      case 'hgt': {
        const list = field.split('');
        const unit = [list.pop(), list.pop()].reverse().join('');
        const val = parseInt(list.join(''), 10);
        console.log(unit, val);
        if ((unit === 'cm' && val >= 150 && val <= 193) || (unit === 'in' && val >= 59 && val <= 76)) {
          dataValid = true;
        } else {
          dataValid = false;
        }
        break;
      }
      case 'hcl': {
        if (/^#([0-9]|[a-f]){6}$/.test(field)) {
          dataValid = true;
        } else {
          dataValid = false;
        }
        break;
      }
      case 'ecl': {
        if (/^(amb|blu|brn|gry|grn|hzl|oth){1}$/.test(field)) {
          dataValid = true;
        } else {
          dataValid = false;
        }
        break;
      }
      case 'pid': {
        if (/^\d{9}$/.test(field)) {
          dataValid = true;
        } else {
          dataValid = false;
        }
        break;
      }
      default: {
      }
    }
    return dataValid;
  }
  private checkFieldInvalid(type: string, field: any, optional: boolean, dataValidation: boolean = false): boolean {
    let dataValid = true;
    if (dataValidation) {
      dataValid = this.validateData(type, field);
    }
    return optional === false && (_.isNil(field) || !dataValid);
  }

  validatePassport(passport: any, optional: string[] = [], validateData: boolean = false): boolean {
    let valid = true;
    if (this.checkFieldInvalid('byr', passport.byr, optional?.includes('byr'), validateData)) {
      valid = false;
    }
    if (this.checkFieldInvalid('iyr', passport.iyr, optional?.includes('iyr'), validateData)) {
      valid = false;
    }
    if (this.checkFieldInvalid('eyr', passport.eyr, optional?.includes('eyr'), validateData)) {
      valid = false;
    }
    if (this.checkFieldInvalid('hgt', passport.hgt, optional?.includes('hgt'), validateData)) {
      valid = false;
    }
    if (this.checkFieldInvalid('hcl', passport.hcl, optional?.includes('hcl'), validateData)) {
      valid = false;
    }
    if (this.checkFieldInvalid('ecl', passport.ecl, optional?.includes('ecl'), validateData)) {
      valid = false;
    }
    if (this.checkFieldInvalid('pid', passport.pid, optional?.includes('pid'), validateData)) {
      valid = false;
    }
    if (this.checkFieldInvalid('cid', passport.cid, optional?.includes('cid'), validateData)) {
      valid = false;
    }
    return valid;
  }

  part1(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    const result: ResultItem = { value: puzzle.filter((x: any) => this.validatePassport(x, ['cid'])).length, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  part2(): void {
    const start = new Date();
    const puzzle = _.cloneDeep(this.puzzle);
    const value = puzzle.filter((x: any) => this.validatePassport(x, ['cid'], true)).length;
    const result: ResultItem = { value, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
