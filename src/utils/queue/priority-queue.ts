import { IQueue } from './queue';
import { MinHeap } from './min-heap';

export interface PriorityQueueItem<T> {
  value: T;
  priority: number;
}

export class PriorityQueue<T> implements IQueue<PriorityQueueItem<T>> {
  queue: MinHeap<PriorityQueueItem<T>>;

  constructor(items: PriorityQueueItem<T>[]) {
    this.queue = new MinHeap(items, p => p.priority);
  }

  dequeue() {
    return this.queue.dequeue();
  }

  enqueue({ value, priority }: PriorityQueueItem<T>) {
    this.queue.enqueue({ value, priority });
  }

  length() {
    return this.queue.length();
  }
}
