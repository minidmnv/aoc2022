import {advanced_03} from "../src/03/advanced";
import {basic_03} from "../src/03/basic";

const Benchmarkify = require("benchmarkify");

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day 03").printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day 03");

//add reference
// @ts-ignore
bench.ref("Day 03 - basic", async done => {
  await basic_03(false);
  done();
});

//@ts-ignore
bench.add("Day 03 - advanced", async done => {
  await advanced_03(false);
  done();
});

bench.run();
