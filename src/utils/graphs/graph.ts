export class Node<T> {
  constructor(private data: T, private comparator: (a: T, b: T) => number,
              private adjacent: Node<T>[] = []) {
  }

  addAdjacent = (node: Node<T>): void => {
    this.adjacent.push(node);
  }


}

export class Graph<T> {
  constructor(private nodes: Map<T, Node<T>> = new Map(), private comparator: (a: T, b: T) => number) {}

  addNode = (data: T): Node<T> => {
    let node = this.nodes.get(data);

    if (node) return node;

    node = new Node<T>(data, this.comparator);
    this.nodes.set(data, node);

    return node;
  }

  addEdge = (source: T, destination: T)
}
