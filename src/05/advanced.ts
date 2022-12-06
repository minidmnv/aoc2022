import {logResponse} from '../utils/log-utils'
import {parseInitialState, parseInstruction} from "./utils";

const TASK_DATA = ['05', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_05 = async (input: string[], logIt: boolean) => {
  const inputHeaderEndIndex = input.indexOf("");
  const [header, instructions] = [input.slice(0, inputHeaderEndIndex - 1), input.slice(inputHeaderEndIndex + 1, input.length - 1)];

  const state: string[][] = parseInitialState(header);

  instructions.forEach(instruction => {
    const [count, from, to] = parseInstruction(instruction);

    const initialLengthOfFromStack = state[from].length;

    state[to].push(...state[from].slice(initialLengthOfFromStack - count));

    for (let j = 0; j < count; j++) {
      state[from].pop();
    }
  })

  const response = state.map(stack => stack[stack.length - 1]).join("");
  logIt && logResponse(TASK_LABEL, response);

  return response;
}
