export interface IQueueable {
  toString(): string;
}
export interface IQueue<T> {
  enqueue(v: T): void;
  dequeue(): T | undefined;
  length(): number;
}

export class Queue<T extends IQueueable> implements IQueue<T> {
  private elementsMap = new Map<string, T>();

  constructor(private readonly array: T[] = []) {}

  dequeue(): T | undefined {
    return this.array.shift();
  }

  enqueue(v: T) {
    this.array.push(v);
    this.elementsMap.set(v.toString(), v);
  }

  length() {
    return this.array.length;
  }
}
