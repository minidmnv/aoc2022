type ValueFunction<T> = (a: T) => number;
const defaultValueFn = <T>(v: T) => v as unknown as number;

export class MinHeap<T> {
  constructor(private data: T[], private valueFn: ValueFunction<T> = defaultValueFn) {
    this.initialize();
  }

  public enqueue(value: T) {
    this.data.push(value);
    this.pushUp(this.lastIndex());
  }

  public dequeue(): T | undefined {
    this.swap(0, this.lastIndex());
    const last = this.data.pop();
    this.pushDown(0);
    return last;
  }

  public length() {
    return this.data.length;
  }

  private pushUp(targetIndex: number) {
    let parentIndex = this.getParentIndex(targetIndex);

    while (targetIndex > 0 && this.getValueAt(targetIndex) < this.getValueAt(parentIndex)) {
      this.swap(targetIndex, parentIndex);
      targetIndex = parentIndex;
      parentIndex = this.getParentIndex(parentIndex);
    }
  }

  private pushDown(targetIndex: number) {
    let end = this.data.length - 1;

    while (targetIndex <= end) {
      const [left, right] = this.getChildIndexes(targetIndex, end);
      const smallerValue = right !== null && this.getValueAt(right) < this.getValueAt(left) ? right : left;

      if (left <= end && this.getValueAt(smallerValue) < this.getValueAt(targetIndex)) {
        this.swap(targetIndex, smallerValue);
        targetIndex = smallerValue;
        continue;
      }

      return;
    }
  }

  private swap(indexOne: number, indexTwo: number) {
    const temp = this.data[indexTwo];
    this.data[indexTwo] = this.data[indexOne];
    this.data[indexOne] = temp;
  }

  private getChildIndexes(parentIndex: number, max: number): [number, number | null] {
    const leftChildIndex = parentIndex * 2 + 1;
    const endChildIndex = leftChildIndex + 1;
    return [leftChildIndex, endChildIndex <= max ? endChildIndex : null];
  }

  private initialize() {
    for (let i = 0; i < this.data.length; i++) {
      this.pushUp(i);
    }
  }

  private lastIndex() {
    return this.data.length - 1;
  }

  private getValueAt(index: number) {
    return this.valueFn(this.data[index]);
  }

  private getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }
}
