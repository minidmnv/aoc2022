import {readFile} from "../src/utils/file-utils";
import {FileSeparator} from "../src/utils/file-separator";
import {advanced_05} from "../src/05/advanced";
import {basic_05} from "../src/05/basic";

const DAY = '05';

const Benchmarkify = require("benchmarkify");
const input = readFile(DAY, FileSeparator.LINE);

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day " + DAY).printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day " + DAY);

//add reference
// @ts-ignore
bench.ref(`Day ${DAY} - basic`, async done => {
  await basic_05(input, false);
  done();
});

//@ts-ignore
bench.add(`Day ${DAY} - advanced`, async done => {
  await advanced_05(input, false);
  done();
});

bench.run();
