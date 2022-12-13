export class Point {
  constructor(public x: number, public y: number) {}

  toCoordString(): string {
    return `${this.x},${this.y}`;
  }
}

export class CartesianPoint extends Point {
  constructor(public x: number, public y: number, public value: number) {
    super(x, y);
  }

  toString(): string {
    return `${this.toCoordString()},${this.value}`;
  }
}
