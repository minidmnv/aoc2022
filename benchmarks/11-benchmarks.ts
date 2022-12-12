import { readFile } from '../src/utils/file-utils'
import { FileSeparator } from '../src/utils/fileSeparator'
import { basic_11 } from '../src/11/basic'
import { advanced_11 } from '../src/11/advanced'

const DAY = '11';

const Benchmarkify = require("benchmarkify");
const input = readFile(DAY, FileSeparator.LINE, false);

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day " + DAY).printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day " + DAY);

//add reference
// @ts-ignore
bench.ref(`Day ${DAY} - basic`, async done => {
  await basic_11(input,8, 20, false);
  done();
});

//@ts-ignore
bench.add(`Day ${DAY} - advanced`, async done => {
  await advanced_11(input, 8, 10000, false);
  done();
});

bench.run();
