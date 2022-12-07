import {Directory, File, Instruction, IResource} from "./types";

const COMMAND_PREFIX = "$";

export const parseInput = (input: string[]) => {
  const root = new Directory('#root#', null);
  let currentDirectory: Directory = root;
  const directories: Directory[] = [root];

  input.forEach(line => {
    if(line.startsWith(COMMAND_PREFIX)) {
      currentDirectory = parseInstruction(line, currentDirectory, root);
    } else {
      const resource = parseResource(line, currentDirectory);
      if(resource instanceof Directory) {
        directories.push(resource);
      }
    }
  });

  return directories;
}

const parseResource = (response: string, parent: Directory): IResource => {
  const [size, name] = response.split(" ");
  if(size === 'dir') {
    const directory = new Directory(name, parent);
    parent.directories.push(directory);
    return directory;
  }

  const file = new File(name, +size, parent);
  parent.files.push(file);

  return file;
}

const parseInstruction = (instruction: string, currentDirectory: Directory, root: Directory): Directory => {

  const instructionType = parseInstructionType(instruction)

  switch (instructionType) {
    case Instruction.CHANGE_DIRECTORY:
      return currentDirectory.directories.find(dir => dir.name === instruction.split(" ")[2])!;
    case Instruction.CHANGE_DIRECTORY_UP:
      return currentDirectory.parent!;
    case Instruction.CHANGE_DIRECTORY_ROOT:
      return root;
    default:
      return currentDirectory;
  }
}

export const pickDirectoriesAtMost = (directories: Directory[], THRESHOLD: number) => {
  return directories.filter(dir => dir.getSize() < THRESHOLD);
}

export const pickDirectoriesAtLeast = (directories: Directory[], THRESHOLD: number) => {
  return directories.filter(dir => dir.getSize() > THRESHOLD);
}

function parseInstructionType(instruction: string) {
  return instruction.includes("/") ? Instruction.CHANGE_DIRECTORY_ROOT :
      instruction.includes("..") ? Instruction.CHANGE_DIRECTORY_UP.valueOf() : instruction.includes(COMMAND_PREFIX + " ls") ?
          Instruction.LIST_FILES : Instruction.CHANGE_DIRECTORY;
}
