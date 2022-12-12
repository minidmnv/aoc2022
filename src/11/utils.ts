import { Monkey, MonkeyLinesNumber } from './types'

export const parseMonkey = (lines: string[]): Monkey => {
  const operationLine = lines[MonkeyLinesNumber.OPERATION.valueOf()].split(" ");
  return {
    items: lines[MonkeyLinesNumber.STARTING_ITEMS.valueOf()].split(": ")[1].split(", ").map(item => +item),
    operation: operationLine[6] == "+" ? (old: number) => old + (isNaN(+operationLine[7]) ? old : +operationLine[7])
      : (old: number) => old * (isNaN(+operationLine[7]) ? old : +operationLine[7]),
    test: +lines[MonkeyLinesNumber.TEST.valueOf()].split(" ")[5],
    trueMonkeyIndex: +lines[MonkeyLinesNumber.TRUE_ACTION.valueOf()].split(" ")[9],
    falseMonkeyIndex: +lines[MonkeyLinesNumber.FALSE_ACTION.valueOf()].split(" ")[9],
  }
}

export const inspectItemBasic = (monkey: Monkey) => {
  const worryLevel = Math.floor(monkey.operation(monkey.items.shift()) / 3);
  const monkeyIndex = worryLevel % monkey.test > 0 ? monkey.falseMonkeyIndex : monkey.trueMonkeyIndex;

  return [worryLevel, monkeyIndex];
}

export const inspectItemAdvanced = (monkey: Monkey, lcm: number) => {
  const worryLevel = leastWorryLevel(Math.floor(monkey.operation(monkey.items.shift())), lcm);
  const monkeyIndex = worryLevel % monkey.test > 0 ? monkey.falseMonkeyIndex : monkey.trueMonkeyIndex;

  return [worryLevel, monkeyIndex];
}

const leastWorryLevel = (value: number, lcm: number): number => {
  while (value > lcm) {
    value -= lcm;
  }

  return value;
}
