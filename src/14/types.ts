import { GridPoint, Point } from '../utils';

export const CAVE_ELEMENT = {
  AIR: '.',
  SAND: 'o',
  ROCK: '#',
  SAND_SOURCE: '+'
} as const;

export const SAND_RESULT = {
  MOVE: 'MOVE',
  REST: 'REST',
  LOST: 'LOST'
} as const;

export type CaveElementValue = typeof CAVE_ELEMENT[keyof typeof CAVE_ELEMENT];
export type SandResult = typeof SAND_RESULT[keyof typeof SAND_RESULT];

export type Sand = [SandResult, Point];
export type CaveModel = Map<number, Array<GridPoint<CaveElementValue>>>;
