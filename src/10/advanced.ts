import { logResponse } from '../utils/log-utils'
import { range } from '../utils/numbers-utils'
import { parseInstruction } from './utils'

const TASK_DATA = ['10', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_10 = async (inputContent: string[], logIt: boolean) => {
  const pixels: string[] = [];

  let signal = 1;
  let instructionBuffer: number = 0;
  let instructionIndex = 0;
  range(1, 240).forEach(pixel => {
    const number = (pixel - signal) % 40;
    number <= 2 && number >= 0 ? pixels.push("✨") : pixels.push("⬛");

    if(instructionBuffer !== 0) {
      signal += instructionBuffer;

      instructionBuffer = 0;

    } else {
      const [instruction, instructionValue] = parseInstruction(inputContent[instructionIndex]);
      instructionIndex += 1;

      if(instructionValue) {
        instructionBuffer = +instructionValue;
      }
    }
  });

  range(0, 5).forEach(val => {
    console.log(pixels.slice(val * 40, val * 40 + 39).join(""));
  });

  logIt && logResponse(TASK_LABEL, pixels);

  return pixels;
}
