import {Point} from "../utils";

export type SensorBeaconModel = [Point, Point][];

export const rangeSort = (first: Range, second: Range) => first.start - second.start;

export class Range {
  constructor(readonly start: number, readonly end: number) {}

  public connect = (other: Range): Range => {
    const start = [this.start, other.start].sort((n1, n2) => n1- n2)[0];
    const end = [this.end, other.end].sort((n1, n2) => n1- n2)[1];

    return new Range(start, end);
  }

  public isOverlappingOrTouching = (other: Range): boolean => {
    if(this.start < other.start) {
      return this.end >= other.start - 1;
    }

    return other.end >= this.start - 1;
  }

  public length = (): number => {
    return this.end - this.start + 1;
  }

  //merge this range with list of ranges -> return multiple ranges if there are holes in between, return one range if not
  static merge = (ranges: Range[]) => {
    return ranges.reduce((acc: Range[], range: Range) => {
      let currRange = range;
      acc.forEach((r: Range, index: number) => {
        currRange = currRange.isOverlappingOrTouching(r) ? acc.splice(index, 1) && currRange.connect(r) : currRange;
      })

      return [...acc, currRange].sort(rangeSort);
    }, []);
  }

  public has(index: number): boolean {
    return this.start <= index && this.end >= index;
  }

  public split(index: number): Range[] {
    return [new Range(this.start, index - 1), new Range(index + 1, this.end)];
  }
}
