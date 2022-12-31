export class Point {
  constructor(public x: number, public y: number) {}

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

export class CartesianPoint extends Point {
  constructor(public x: number, public y: number, public value: number) {
    super(x, y);
  }

  toString(): string {
    return `${super.toString()},${this.value}`;
  }

}

export class GridPoint<T> {
  constructor(public x: number, public y: number, public value: T) {}

  toString(): string {
    return `${this.x},${this.y},${this.value}`;
  }

  stringCoords(): string {
    return `${this.x},${this.y}`;
  }

}


export class Grid<T extends Point> {
  constructor(private points: T[][]) {}

  forEachPoint(fn: (point: T) => void) {
    this.points.forEach(row => row.forEach(fn));
  }

  getPoint(x: number, y: number) {
    return this.points[y][x];
  }

  getNeighbours(point: T, diagonal = false): T[] {
    return [
        [point.x - 1, point.y],
        [point.x + 1, point.y],
        [point.x, point.y - 1],
        [point.x, point.y + 1],
        ...(diagonal ?
        [
          [point.x - 1, point.y - 1],
          [point.x + 1, point.y + 1],
          [point.x + 1, point.y - 1],
          [point.x - 1, point.y + 1],
        ] : [])
        ]
    .filter(([x, y]) => this.exists(x, y))
    .map(([x, y]) => this.getPoint(x, y));
  }

  private exists(x: number, y: number): boolean {
    if(x < 0 || y < 0) {
      return false;
    }

    return y < this.points.length && x < this.points[0].length;
  }

  pointFromString(value: string) {
    const [x, y] = value.split(',').map(num => Number(num));

    return this.getPoint(x, y);
  }
}
