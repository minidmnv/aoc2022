import { readFile } from '../utils/file-utils'
import { FileSeparator } from '../utils/fileSeparator'
import { logResponse, measureMemoryAndTime } from '../utils/log-utils'
import { countCharCodePriority, countItemPriority, splitInHalf } from './utils'
import { type } from 'os'

const TASK_DATA = ['03', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_03 = async (logIt: boolean) => {
  const initial = process.memoryUsage().heapUsed / 1024 / 1024;
  console.time(TASK_LABEL);
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);
  let result = 0;

  for (let i = 0; i < input.length / 3; i++) {

    const groupRucksacks = input.slice(i*3, i*3+3);
    const findings: number[] = [];
    const groupItems: string[] = [];
    groupRucksacks.map(rucksack => { return new Set(rucksack.split(""))})
      .forEach(rucksack => groupItems.push(...rucksack));

    groupItems.map(item => item.charCodeAt(0))
      .forEach(charCode => typeof findings[charCode] !== 'undefined' ? findings[charCode] += 1 : findings[charCode] = 0);

    result += countCharCodePriority(findings.indexOf(2));

  }

  logIt && logResponse(TASK_LABEL, result)
  logIt && measureMemoryAndTime(initial, TASK_LABEL)

  return result;
}

advanced_03(true)
