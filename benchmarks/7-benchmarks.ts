import {readFile} from "../src/utils/file-utils";
import {FileSeparator} from "../src/utils/fileSeparator";
import {basic_07} from "../src/07/basic";
import {advanced_07} from "../src/07/advanced";

const DAY = '07';

const Benchmarkify = require("benchmarkify");
const input = readFile(DAY, FileSeparator.LINE);

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day " + DAY).printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day " + DAY);

//add reference
// @ts-ignore
bench.ref(`Day ${DAY} - basic`, async done => {
  await basic_07(input, false);
  done();
});

//@ts-ignore
bench.add(`Day ${DAY} - advanced`, async done => {
  await advanced_07(input, false);
  done();
});

bench.run();
