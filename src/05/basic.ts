import { readFile } from '../utils/file-utils'
import { FileSeparator } from '../utils/fileSeparator'
import { logResponse } from '../utils/log-utils'
import {parseInitialState, parseInstruction} from "./utils";

const TASK_DATA = ['05', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_05 = async (logIt: boolean) => {
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);

  const inputHeaderEndIndex = input.indexOf("");
  const [header, instructions] = [input.slice(0, inputHeaderEndIndex - 1), input.slice(inputHeaderEndIndex + 1)];

  const state: string[][] = parseInitialState(header);

  instructions.forEach(instruction => {
    const [count, from, to] = parseInstruction(instruction);
    for (let i = 0; i < count; i++) {
      state[to].push(state[from].pop()!);
    }
  })

  const response = state.map(stack => stack[stack.length - 1]).join("");
  logIt && logResponse(TASK_LABEL, response);

  return response;
}

basic_05(true);
