import {CartesianPoint} from "./cartesian-coords";
import {PriorityQueue} from "./queue";

/**
 * Find the shortest path with Dijkstra algorithm between two points
 * @param grid
 * @param startingPoint
 * @param destinationPoint
 */
export const findShortestPath = (grid: CartesianPoint[][], startingPoint: CartesianPoint, destinationPoint: CartesianPoint): Map<string, number> => {
  const queue = new PriorityQueue<string>([]);
  const pathInfo = new Map<string, number>();
  const visited = new Set<CartesianPoint>();

  return pathInfo;
}
