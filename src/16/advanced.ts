import { logResponse } from '../utils';
import { createGraph, createValves } from './utils';
import { Valve } from './types';

const TASK_DATA = ['16', 'Advanced'];
const TASK_LABEL = TASK_DATA.join(' ');

export const advanced16 = async (inputContent: string[], remainingTime: number, logIt: boolean): Promise<any> => {
  const valves = createValves(inputContent);

  const response = solve(valves, remainingTime);
  logIt && logResponse(TASK_LABEL, response);

  return response;
};

const solve = (valves: Map<string, Valve>, remainingTime: number): number => {
  if (!valves) {
    return 0;
  }
  const cache = new Map();
  const opened = new Map();

  const flowingValves = [...valves.entries()].filter(valve => valve[1].flow > 0);
  const graph = createGraph(valves);
  const distances = new Array(...valves.keys()).reduce((map, valve) => {
    return map.set(valve, graph.dijkstra(valve));
  }, new Map<string, Map<string, number>>());

  function count (time: number, humanValve: string, elephantValve: string): number {
    const best = 0;
    // @ts-expect-error
    for (const nextHumanValve of [humanValve, ...flowingValves.get(humanValve)?.valves]) {
      //do something here ??
    }

    return best;
  }

  return count(remainingTime, 'AA', 'AA');
};

//not working correctly
const solve2 = (valves: Map<string, Valve>, remainingTime: number): number => {
  if (!valves) {
    return 0;
  }
  const cache = new Map();
  const opened = new Map();
  function recur (time: number, human: string, elephant: string): number {
    // @ts-expect-error
    const flowed = [...opened.entries()].reduce((sum, [key, value]) => sum + (value ? value * valves.get(key)?.flow : 0), 0);
    if (!time) return flowed;

    const key = `${time}-${human}-${elephant}`;
    if ((cache.get(key) || -Infinity) >= flowed) return 0;
    cache.set(key, flowed);

    let best = 0;
    // @ts-expect-error
    for (const nextHuman of [human, ...valves.get(human)?.valves]) {
      if (human === nextHuman) {
        if (opened.has(human) || !valves.get(human)?.flow) continue;
        opened.set(human, time);
      }

      if (elephant) {
        for (const nextElephant of [elephant, ...valves.get(elephant)?.valves]) {
          if (elephant === nextElephant) {
            if (opened.has(elephant) || !valves.get(elephant)?.flow) continue;
            opened.set(elephant, time);
          }

          best = Math.max(best, recur(time - 1, nextHuman, nextElephant));

          if (elephant === nextElephant) opened.delete(elephant);
        }
      } else {
        best = Math.max(best, recur(time - 1, nextHuman, elephant));
      }

      if (human === nextHuman) opened.delete(human);
    }

    return best;
  }
  return recur(remainingTime, 'AA', 'AA');
};
