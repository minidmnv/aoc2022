import {Point} from "./types";

const move = (point: Point, moveRange: number[]) => {
  return new Point(point.x + moveRange[1], point.y + moveRange[0]);
}

const follow = (tracker: Point, traced: Point): Point => {
  let movedTracker = tracker;

  const distance = {
    x: Math.abs(traced.x - tracker.x),
    y: Math.abs(traced.y - tracker.y),
    xDirection: Math.sign(traced.x - tracker.x),
    yDirection: Math.sign(traced.y - tracker.y),
  }

  if(distance.x > 1 || distance.y > 1) {
    movedTracker = new Point(tracker.x + distance.xDirection, tracker.y + distance.yDirection);
  } else if(Math.sign(traced.x) !== Math.sign(tracker.x) && distance.x > 1) {
    movedTracker = new Point(tracker.x + Math.sign(traced.x), Math.sign(traced.y) !== Math.sign(tracker.y) ? tracker.y + Math.sign(traced.y) : tracker.y);
  } else if(Math.sign(traced.y) !== Math.sign(tracker.y) && distance.y > 1) {
    movedTracker = new Point(Math.sign(traced.x) !== Math.sign(tracker.x) ? tracker.x + Math.sign(traced.x) : tracker.x, tracker.y + Math.sign(traced.y));
  }

  return movedTracker;
}

export const moveRope = (instruction: number[], knots: Point[]): any[] => {
  const [y, x] = instruction;
  const visitedPoints: Point[] = [];

  const length = Math.abs(x) > Math.abs(y) ? Math.abs(x) : Math.abs(y);
  const moveRange = [new Array(length).fill(Math.sign(y)), new Array(length).fill(Math.sign(x))];

  for(let i = 0; i < length; i++) {
    knots[0] = move(knots[0], [moveRange[0][i], moveRange[1][i]]);

    for(let j = 0; j < knots.length - 1; j++) {
      knots[j + 1] = follow(knots[j + 1], knots[j]);
    }

    visitedPoints.push(knots[knots.length - 1]);
  }

  return [knots, visitedPoints];
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
