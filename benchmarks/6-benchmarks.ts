import {day_06} from "../src/06";
import {readFileContent} from "../src/utils/file-utils";

const Benchmarkify = require("benchmarkify");

const content = readFileContent("06");

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day 06").printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day 06");

//add reference
// @ts-ignore
bench.ref("Day 06 - basic", async done => {
  await day_06(content, 3, false);
  done();
});

//@ts-ignore
bench.add("Day 06 - advanced", async done => {
  await day_06(content, 13, false);
  done();
});

bench.run();
