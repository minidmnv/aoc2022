import { inspectItemBasic, parseMonkey } from './utils'
import { range } from '../utils/numbers-utils'
import { Monkey } from './types'
import { logResponse } from '../utils/log-utils'

const TASK_DATA = ['11', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_11 = async (inputContent: string[], monkeysCount: number, roundsLimit: number, logIt: boolean) => {
  const monkeys: Monkey[] = [];
  const monkeysInspectCounter: number[] = new Array(monkeysCount).fill(0);
  const rounds = range(1, roundsLimit);

  for(let i = 0; i < monkeysCount; i++) {
    monkeys.push(parseMonkey(inputContent.slice(7 * i, 7 * i + 6)));
  }

  rounds.forEach(round => {
    monkeys.forEach((monkey, currentMonkey) => {
      while (monkey.items.length > 0) {
        const [item, monkeyIndex] = inspectItemBasic(monkey);
        monkeysInspectCounter[currentMonkey] += 1;
        monkeys[monkeyIndex].items.push(item);
      }
    })
  })

  const response = monkeysInspectCounter.sort((a, b) => b - a).slice(0 ,2).reduce((acc, counter) => acc * counter, 1);

  logIt && logResponse(TASK_LABEL, response);

  return response;
}
