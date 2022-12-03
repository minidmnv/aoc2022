import { readFile } from '../utils/file-utils'
import { FileSeparator } from '../utils/fileSeparator'
import { logResponse, measureMemoryAndTime } from '../utils/log-utils'
import { countItemPriority, splitInHalf } from './utils'

const TASK_DATA = ['03', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_03 = async (logIt: boolean) => {
  const initial = process.memoryUsage().heapUsed / 1024 / 1024;

  console.time(TASK_LABEL);
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);

  const result = input.reduce((acc, rucksack) => {
    const [firstCompartment, secondCompartment] = splitInHalf(rucksack).map(input => input.split(''));

    const item = firstCompartment.find(item => secondCompartment.some(otherItem => otherItem === item));

    const priority = countItemPriority(item!);

    return acc + priority;
  }, 0);

  logIt && logResponse(TASK_LABEL, result)
  logIt && measureMemoryAndTime(initial, TASK_LABEL)

  return result;
}

basic_03(true)
