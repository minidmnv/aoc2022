import {readFile} from '../src/utils/file-utils'
import {FileSeparator} from '../src/utils/file-separator'
import {basic_12} from "../src/12/basic";
import {advanced_12} from "../src/12/advanced";

const DAY = '12';

const Benchmarkify = require("benchmarkify");
const input = readFile(DAY, FileSeparator.LINE, true);

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day " + DAY).printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day " + DAY);

//add reference
// @ts-ignore
bench.ref(`Day ${DAY} - basic`, async done => {
  await basic_12(input, false);
  done();
});

//@ts-ignore
bench.add(`Day ${DAY} - advanced`, async done => {
  await advanced_12(input, false);
  done();
});

bench.run();
