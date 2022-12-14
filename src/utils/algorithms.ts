import {CartesianPoint, Grid, Point} from "./cartesian-coords";
import {PriorityQueue} from "./queue";

export interface IShortestPath {
  pointString: string;
  distanceFromStart: number;
  path?: CartesianPoint;
}

export interface ShortestPathOptions {
  pointWeight?: (point: Point) => number;
  pointPredicate?: (point: CartesianPoint, currentPoint: CartesianPoint) => boolean;
}

/**
 * Find the shortest path with Dijkstra algorithm between two points
 * @param grid
 * @param startingPoint
 * @param pointWeight
 * @param pointPredicate
 */
export const findShortestPath =
    (grid: Grid<CartesianPoint>, startingPoint: Point,
     {pointWeight = () => 1, pointPredicate = () => false}: ShortestPathOptions):
        Map<string, IShortestPath> => {
      const queue = new PriorityQueue<string>([]);
      const pathInfo = new Map<string, IShortestPath>();
      const visited = new Set<string>();

      grid.forEachPoint(point => {
        const pointString = point.toString();
        const distanceFromStart = point === startingPoint ? 0 : Infinity;

        queue.enqueue({
          value: pointString,
          priority: distanceFromStart,
        });
        pathInfo.set(pointString, {
          pointString,
          distanceFromStart,
        });

      });

      while (queue.length() > 0) {
        const item = queue.dequeue()!;
        const point = grid.pointFromString(item.value);

        if (visited.has(item.value)) {
          continue;
        }

        visited.add(item.value);

        for (const neighbour of grid.getNeighbours(point).filter(n => pointPredicate(n, point))) {
          const neighborItem = pathInfo.get(neighbour.toString());

          if (visited.has(neighbour.toString()) || !neighborItem) {
            continue;
          }

          const distance = item.priority + pointWeight(neighbour);

          if (distance < neighborItem.distanceFromStart) {
            queue.enqueue({
              value: neighborItem.pointString,
              priority: distance,
            });

            neighborItem.distanceFromStart = distance;
            neighborItem.path = point;
            pathInfo.set(neighborItem.pointString, neighborItem);
          }
        }
      }


      return pathInfo;
    }
