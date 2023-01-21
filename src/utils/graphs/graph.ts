export class Node<T> {
  constructor(readonly data: T, public adjacent: Node<T>[] = []) {
  }

  addAdjacent = (node: Node<T>): void => {
    this.adjacent.push(node);
  }
}

export class Graph<T> {
  constructor(private nodes: Map<T, Node<T>> = new Map()) {}

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

    if(sourceNode && targetNode) {
      sourceNode.addAdjacent(targetNode);
    }
  };

  private depthFirstSearch = (node: Node<T>, visited: T[]): void => {
    if(!node) return;

    visited.push(node.data);

    node.adjacent.forEach((item) => {
      if(!visited.includes(item.data)) {
        this.depthFirstSearch(item, visited);
      }
    });
  };

  dfs = (startingNodeData: T): T[] => {
    const stack = [this.nodes.get(startingNodeData)];
    // Create a set to store visited vertices
    let visited: T[] = [];
    // Start the DFS traversal
    while (stack.length > 0) {
      // Pop a vertex from the stack
      let vertex = stack.pop();
      // If the vertex has not been visited, visit it and add its neighbours to the stack
      if (vertex && !visited.includes(vertex.data)) {
        visited.push(vertex.data);

        //TODO: change this console log to custom function
        console.log(vertex);

        for (let neighbour of vertex.adjacent) {
          stack.push(neighbour);
        }
      }
    }

    return visited;
  }
}
