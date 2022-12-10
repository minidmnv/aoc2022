export const range = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);
