import { Valve } from './types';

export const waitTillEnd = (maxTime: number, elapsedTime: number, relievedPressure: number, alreadyOpened: Set<Valve>): number => {
  const timeLeft = maxTime - elapsedTime;
  return relievedPressure + [...alreadyOpened.keys()].reduce((acc, valve) => acc + valve.flow, 0) * timeLeft;
};

export const labelsToValves = (labels: Set<string>, valves: Map<string, Valve>): Set<Valve> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new Set<Valve>([...labels.keys()].map((label: string) => valves.get(label)!));
};
