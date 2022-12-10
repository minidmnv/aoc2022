import {range} from "../utils/numbers-utils";

export const setGridValue = (grid: any[][], y: number, x: number, value: any): void => {
  grid[y][x] = value;
}

export const checkVisibility = (griddedInput: string[][], y: number, x: number): boolean => {
  const height = griddedInput[y][x];
  const gridHeight = griddedInput.length;

  return !griddedInput[y].slice(0, x).some(val => +val >= +height) ||
      !griddedInput[y].slice(x + 1).some(val => +val >= +height) ||
      !range(0, y - 1).map(ind => griddedInput[ind][x]).some(val => +val >= +height) ||
      !range(y + 1, gridHeight - 1).map(ind => griddedInput[ind][x]).some(val => +val >= +height);
}

export const countVisibility = (griddedInput: string[][], y: number, x: number): number => {
  const height = griddedInput[y][x];
  const gridHeight = griddedInput.length - 1;

  function countLeft() {
    const rangeNumbers = range(0, x - 1).reverse();
    const index = rangeNumbers.map(ind => griddedInput[y][ind]).map(val => {
      return +val >= +height ? 0 : 1
    }).indexOf(0);

    return index >= 0 ? index + 1 : rangeNumbers.length;
  }

  function countRight() {
    const rangeNumbers = range(x + 1, gridHeight);
    const index = rangeNumbers.map(ind => griddedInput[y][ind]).map(val => {
      return +val >= +height ? 0 : 1
    }).indexOf(0);

    return index >= 0 ? index + 1: rangeNumbers.length;
  }

  function countTop() {
    const rangeNumbers = range(0, y - 1).reverse();
    const index = rangeNumbers.map(ind => griddedInput[ind][x]).map(val => {
      return +val >= +height ? 0 : 1
    }).indexOf(0);

    return index >= 0 ? index + 1: rangeNumbers.length;
  }

  function countBottom() {
    const rangeNumbers = range(y + 1, gridHeight);
    const index = rangeNumbers.map(ind => griddedInput[ind][x]).map(val => {
      return +val >= +height ? 0 : 1
    }).indexOf(0);

    return index >= 0 ? index + 1 : rangeNumbers.length;
  }

  const leftScore = x > 0 ?
      countLeft() : 0;
  const rightScore = x < gridHeight?
      countRight() : 0;
  const topScore = y > 0 ?
      countTop() : 0;
  const bottomScore = y < gridHeight?
      countBottom() : 0;

  return leftScore * rightScore * topScore * bottomScore;
}


export const findTreeScoreWithBestVisibility = (input: string[]) => {
  const griddedInput: string[][] = input.map(row => row.split(""));
  let response = 0;

  griddedInput.forEach((treeRow, rowIndex) => {
    treeRow.forEach((tree, columnIndex) => {
      const score = countVisibility(griddedInput, rowIndex, columnIndex);
      response = response > score ? response : score;
    })
  })

  return response;
}
