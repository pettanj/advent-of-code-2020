import { Component, OnInit } from '@angular/core';
import { DayBaseComponent, ResultItem, Result } from '../day-base/day-base.component';
import { input1 } from './day8.input';
import * as _ from 'lodash';

interface Value {
  operation: string;
  value: number;
}
interface Instruction {
  instruction: string;
  value?: Value;
}

interface ExecutionResult {
  position: number;
  acc: number;
}

@Component({
  selector: 'app-day7',
  templateUrl: '../day-base/day.component.html',
  styleUrls: ['../day-base/day.component.scss']
})

export class Day8Component extends DayBaseComponent implements OnInit {
  constructor() {
    super();
  }
  name = 'Day 8';
  input = input1;
  result: Result = super.result;

  formatInput(input: string): Instruction[] {
    return input.split('\n').map(x => {
      const [instruction, v] = x.split(' ');
      const value = {operation: v.split('')[0], value: parseInt(v.substring(1), 10)};
      return {instruction, value};
    });
  }

  runInstruction(acc: number, instruction: Instruction, programPosition: number): ExecutionResult {
    switch (instruction.instruction) {
      case 'acc': {
        if (instruction.value?.operation === '+') {
          acc += instruction.value.value;
        } else if (instruction.value?.operation === '-') {
          acc -= instruction.value.value;
        }
        programPosition ++;
        break;
      }
      case 'jmp': {
        if (instruction.value?.operation === '+') {
          programPosition += instruction.value.value;
        } else if (instruction.value?.operation === '-') {
          programPosition -= instruction.value.value;
        }
        break;
      }
      case 'nop': {
        programPosition ++;
        break;
      }
      default: {
        programPosition ++;
      }
    }

    return {acc, position: programPosition};
  }

  part1(): void {
    const start = new Date();
    const program = _.cloneDeep(this.puzzle);
    const instructionHistory: number[] = [];
    let acc = 0;
    let loopCause: (number | null | undefined) = null;
    let lastAccValue = 0;
    for (let i = 0; i < program.length;) {
      if (instructionHistory.includes(i)) {
        loopCause = instructionHistory.pop();
        lastAccValue = acc;
        break;
      } else {
        const res = this.runInstruction(acc, program[i], i);
        acc = res.acc;
        instructionHistory.push(i);
        i = res.position;
      }
    }
    const result: ResultItem = { value: lastAccValue, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.first = result;
  }

  runProgram2(program: Instruction[]): number {
    const instructionHistory: number[] = [];
    let acc = 0;
    let loopCause: (number | undefined);
    for (let i = 0; i < program.length;) {
      if (instructionHistory.includes(i)) {
        loopCause = instructionHistory.pop();
        return -1;
      } else {
        const res = this.runInstruction(acc, program[i], i);
        acc = res.acc;
        instructionHistory.push(i);
        i = res.position;
      }
    }
    return acc;
  }

  fixJmpOrNop(program: Instruction[], index: number): Instruction[] {
    if (program[index].instruction === 'nop') {
      program[index].instruction = 'jmp';
    } else if (program[index].instruction === 'jmp') {
      program[index].instruction = 'nop';
    }
    return program;
  }

  part2(): void {
    const start = new Date();
    const program = _.cloneDeep(this.puzzle);
    let finalAcc = 0;
    for (let i = 0; i < program.length - 1; i++) {
      let acc = -1;
      if (program[i].instruction === 'nop' || program[i].instruction === 'jmp') {
        const tempProg = this.fixJmpOrNop(_.cloneDeep(program), i);
        acc = this.runProgram2(tempProg);
      }
      if (acc !== -1) {
        finalAcc = acc;
        break;
      }
    }

    const result: ResultItem = { value: finalAcc, time: 0 };
    result.time = (new Date().getTime() - start.getTime());
    this.result.second = result;
  }
}
