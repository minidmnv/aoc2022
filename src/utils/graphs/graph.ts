export class Node<T> {
  constructor (readonly data: T, public adjacent: Array<Node<T>> = []) {
  }

  addAdjacent = (node: Node<T>): void => {
    this.adjacent.push(node);
  };
}

export class Graph<T> {
  constructor (private readonly nodes: Map<T, Node<T>> = new Map()) {
  }

  addNode = (data: T): Node<T> => {
    let node = this.nodes.get(data);

    if (node) return node;

    node = new Node<T>(data);
    this.nodes.set(data, node);

    return node;
  };

  addEdge = (source: T, target: T): void => {
    const sourceNode = this.nodes.get(source);
    const targetNode = this.nodes.get(target);

    if (sourceNode && targetNode) {
      sourceNode.addAdjacent(targetNode);
    }
  };

  private readonly depthFirstSearch = (node: Node<T>, visited: T[]): void => {
    if (!node) return;

    visited.push(node.data);

    node.adjacent.forEach((item) => {
      if (!visited.includes(item.data)) {
        this.depthFirstSearch(item, visited);
      }
    });
  };

  dfs = (startingNodeData: T): T[] => {
    const stack = [this.nodes.get(startingNodeData)];
    // Create a set to store visited vertices
    const visited: T[] = [];
    // Start the DFS traversal
    while (stack.length > 0) {
      // Pop a vertex from the stack
      const vertex = stack.pop();
      // If the vertex has not been visited, visit it and add its neighbours to the stack
      if (vertex && !visited.includes(vertex.data)) {
        visited.push(vertex.data);

        // TODO: change this console log to custom function
        console.log(vertex);

        for (const neighbour of vertex.adjacent) {
          stack.push(neighbour);
        }
      }
    }
    return visited;
  };

  dijkstra = (start: T): Map<T, number> => {
    const distances: Map<T, number> = new Map();
    const visited: Set<T> = new Set();
    const unvisited: Set<T> = new Set(Array.from(this.nodes.keys()));

    unvisited.forEach(node => {
      distances.set(node, Infinity);
    });

    distances.set(start, 0);

    while (unvisited.size > 0) {
      const current: T = Array.from(unvisited).reduce((a, b) => (distances.get(a) ?? Infinity) < (distances.get(b) ?? Infinity) ? a : b);

      unvisited.delete(current);
      visited.add(current);

      const currentDistance: number = distances.get(current) ?? Infinity;
      const neighbors: Array<Node<T>> = this.nodes.get(current)?.adjacent ?? [];

      if (neighbors) {
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor.data)) {
            const distance: number = currentDistance + 1;

            if (distance < (distances.get(neighbor.data) ?? Infinity)) {
              distances.set(neighbor.data, distance);
            }
          }
        });
      }
    }

    return distances;
  };
}
