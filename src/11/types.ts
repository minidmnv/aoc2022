export interface Monkey {
  items: number[];
  operation: Function;
  test: number;
  trueMonkeyIndex: number;
  falseMonkeyIndex: number;
}

export enum MonkeyLinesNumber {
  NAME,
  STARTING_ITEMS,
  OPERATION,
  TEST,
  TRUE_ACTION,
  FALSE_ACTION
}
