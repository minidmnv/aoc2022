export const CAVE_ELEMENT = {
  AIR: ".",
  SAND: "o",
  ROCK: "#",
  SAND_SOURCE: "+"
} as const;

export type CaveElementValue = typeof CAVE_ELEMENT[keyof typeof CAVE_ELEMENT];
