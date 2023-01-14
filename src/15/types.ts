import {Point, range} from "../utils";

export type SensorBeaconModel = [Point, Point][];

export class Range {
  constructor(readonly start: number, readonly end: number) {}

  //merge this range with list of ranges -> return multiple ranges if there are holes in between, return one range if not
  merge = (others: Range[]) => {
    let result = [this];
    for (let other of others) {
      result = this.isOverlappingOrTouching(other) ? this.connect(other)
    }
  }
}
