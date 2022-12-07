import {basic_07} from "../07/basic";
import {parseInput, pickDirectoriesAtMost} from "../07/utils";
import {advanced_07} from "../07/advanced";

describe("Day 07 tests", () => {
  const TEST_INPUT = [
    '$ cd /',
    '$ ls',
    'dir a',
    '14848514 b.txt',
    '8504156 c.dat',
    'dir d',
    '$ cd a',
    '$ ls',
    'dir e',
    '29116 f',
    '2557 g',
    '62596 h.lst',
    '$ cd e',
    '$ ls',
    '584 i',
    '$ cd ..',
    '$ cd ..',
    '$ cd d',
    '$ ls',
    '4060174 j',
    '8033020 d.log',
    '5626152 d.ext',
    '7214296 k'];

  describe("Day 07 utils tests", () => {
    test("test input should create root folder to list", () => {
      expect(parseInput(TEST_INPUT).find(dir => dir.name === '#root#')).toBeTruthy();
    });

    test("test input should create root folder which have no parent and add it to the list", () => {
      expect(parseInput(TEST_INPUT).find(dir => dir.parent === null)).toBeTruthy();
    });

    test("test input should create root folder with two files and two directories", () => {
      const rootFolder = parseInput(TEST_INPUT).find(dir => dir.parent === null);
      expect(rootFolder!.files.length).toBe(2);
      expect(rootFolder!.directories.length).toBe(2);
    });

    test("test input should create root with size", () => {
      const rootFolder = parseInput(TEST_INPUT).find(dir => dir.parent === null);
      expect(rootFolder!.getSize()).toBe(48381165);
    });

    test("test input should pick two correct directories at test treshold", () => {
      const directories = pickDirectoriesAtMost(parseInput(TEST_INPUT), 100000);
      expect(directories.length).toBe(2);
      expect(directories.reduce((acc, dir) => acc + dir.getSize(), 0)).toBe(95437);
    });

    test("test input should pick two correct directories at test treshold", () => {
      const directories = pickDirectoriesAtMost(parseInput(TEST_INPUT), 8381165);
      expect(directories.length).toBe(2);
      expect(directories.reduce((acc, dir) => acc + dir.getSize(), 0)).toBe(95437);
    });

  });

  describe("Day 07 basic tests", () => {

    test("empty input should give 0 result", () => {
      return basic_07([], false).then(data => {
        expect(data).toBe(0);
      });
    });

    test("test input should return correct answer", () => {
      return basic_07(TEST_INPUT, false).then(data => {
        expect(data).toBe(95437);
      });
    });

  });

  describe("Day 07 advanced tests", () => {

    test("empty input should give 0 result", () => {
      return advanced_07([], false).then(data => {
        expect(data).toBe(0);
      });
    });

    test("test input should return correct answer", () => {
      return advanced_07(TEST_INPUT, false).then(data => {
        expect(data).toBe(24933642);
      });
    });

  });
})
