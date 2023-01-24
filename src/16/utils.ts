import {State, Valve, valveFromLine} from './types';
import {Graph, Node} from "../utils";
import {Queue} from "../utils/queue/queue";

export const waitTillEnd = (maxTime: number, elapsedTime: number, relievedPressure: number, alreadyOpened: Set<Valve>): number => {
  const timeLeft = maxTime - elapsedTime;
  return relievedPressure + [...alreadyOpened.keys()].reduce((acc, valve) => acc + valve.flow, 0) * timeLeft;
};

export const labelsToValves = (labels: Set<string>, valves: Map<string, Valve>): Set<Valve> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new Set<Valve>([...labels.keys()].map((label: string) => valves.get(label)!));
};

export const createGraph = (valves: Map<string, Valve>): Graph<string> => {
  const nodes = new Array(...valves.entries()).reduce((map, valve) => {
    const node = new Node<string>(valve[0]);
    valve[1].valves.forEach(valveLabel => node.addAdjacent(new Node<string>(valveLabel)));

    return map.set(valve[0], node);
  }, new Map<string, Node<string>>());

  return new Graph<string>(nodes);
};

export const createValves = (inputContent: string[]): Map<string, Valve> => {
  return inputContent.map(line => valveFromLine(line))
  .reduce((map, valve) => {
    return map.set(valve.name, valve);
  }, new Map<string, Valve>());
}

export const insertCheckState = (state: Omit<State, 'currentNode'> , checked: Set<string>, queue: Queue<State>, destination: [string, Valve]) => {
  const {alreadyOpened, elapsedTime, relievedPressure} = state;
  const checkState = JSON.stringify({
    newOpened: [...alreadyOpened].sort(),
    elapsedTime,
    relievedPressure,
  });

  if (checked.size !== checked.add(checkState).size) {
    queue.enqueue({
      currentNode: destination[0],
      alreadyOpened,
      elapsedTime,
      relievedPressure,
    });
  }
}
