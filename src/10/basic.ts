import { logResponse } from '../utils/log-utils'
import { parseInstruction } from './utils'
import { log } from 'util'
import { sign } from 'crypto'

const TASK_DATA = ['10', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_10 = async (inputContent: string[], logIt: boolean) => {

  const cycles = [20, 60, 100, 140, 180, 220];
  const response: number[] = [];
  let cycle = 0;
  let signal = 1;
  inputContent.map(input => parseInstruction(input)).forEach(instruction => {

    if (cycles.indexOf(cycle) >= 0 && cycles.splice(0, 1)) {
      response.push(cycle * signal);
    }

    switch (instruction[0]) {
      case "noop":
        cycle += 1;
        break;
      case "addx":

        cycles.indexOf(cycle + 1) >= 0 && response.push((cycle + 1) * signal) && cycles.splice(0, 1);
        cycles.indexOf(cycle + 2) >= 0 && response.push((cycle + 2) * signal) && cycles.splice(0, 1);
        cycle += 2;

        signal += +instruction[1];
        break
    }

  })

  const result = response.reduce((acc, signal) => acc + signal, 0);

  logIt && logResponse(TASK_LABEL, result);

  return result;
}
