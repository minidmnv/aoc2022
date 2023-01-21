import { Graph } from '../utils/graphs/graph';
import { Valve } from './types'

export const createGraph = (inputLines: string[]): Graph<number> => {
  return new Graph<number>();
};

export const visit = (valve: Valve, minutes: number, pressure: number)
