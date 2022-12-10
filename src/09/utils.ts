import {Point} from "./types";

const move = (point: Point, moveRange: number[]) => {
  return new Point(point.x + moveRange[1], point.y + moveRange[0]);
}

const follow = (tracker: Point, traced: Point): Point => {

  if(Math.abs(Math.abs(traced.x) - Math.abs(tracker.x)) > 1 || Math.abs(Math.abs(traced.y) - Math.abs(tracker.y)) > 1) {
    return new Point(tracker.x + Math.sign(traced.x - tracker.x), tracker.y + Math.sign(traced.y - tracker.y));
  } else if(Math.sign(traced.x) !== 0 && Math.sign(tracker.x) !== 0 && Math.sign(traced.x) !== Math.sign(tracker.x)) {
    return new Point(tracker.x + Math.sign(traced.x), Math.sign(traced.y) !== Math.sign(tracker.y) ? Math.sign(traced.y) : tracker.y);
  } else if(Math.sign(traced.y) !== 0 && Math.sign(tracker.y) !== 0 && Math.sign(traced.y) !== Math.sign(tracker.y)) {
    return new Point(Math.sign(traced.x) !== Math.sign(tracker.x) ? Math.sign(traced.x) : tracker.x, tracker.y + Math.sign(traced.y));
  }

  return tracker;
}

export const moveRope = (instruction: number[], head: Point, tail: Point): any[] => {
  const [y, x] = instruction;
  const visitedPoints: Point[] = [];

  const length = Math.abs(x) > Math.abs(y) ? Math.abs(x) : Math.abs(y);
  const moveRange = [new Array(length).fill(Math.sign(y)), new Array(length).fill(Math.sign(x))];

  for(let i = 0; i < length; i++) {
    head = move(head, [moveRange[0][i], moveRange[1][i]]);
    tail = follow(tail, head);

    visitedPoints.push(tail);
  }

  return [head, tail, visitedPoints];
}


export const parseInstruction = (line: string) => {
  const [direction, steps] = line.split(" ");

  if(direction === 'U') {
    return [+steps, 0];
  } else if(direction === 'D') {
    return [-steps, 0];
  } else if(direction === 'R') {
    return [0, +steps];
  }

  return [0, -steps]
}
