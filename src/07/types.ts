export class Directory implements IResource {
  readonly name: string;
  readonly parent: Directory | null;

  files: File[] = [];
  directories: Directory[] = [];

  constructor(name: string, parent: Directory | null) {
    this.name = name;
    this.parent = parent;
  }

  getSize(): number {
    return this.files.reduce((acc, file) => acc + file.getSize(), 0) +
        this.directories.reduce((acc, dir) => acc + dir.getSize(), 0);
  }
}

export class File implements IResource {
  readonly name: string;
  readonly size: number;
  readonly parent: Directory;

  constructor(name: string, size: number, parent: Directory) {
    this.name = name;
    this.size = size;
    this.parent = parent;
  }

  getSize(): number {
    return this.size;
  }
}

export interface IResource {
  name: string;
  parent: Directory | null;
  size?: number;
}


export enum Instruction {
  LIST_FILES, CHANGE_DIRECTORY, CHANGE_DIRECTORY_ROOT, CHANGE_DIRECTORY_UP
}
