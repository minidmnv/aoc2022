import {basic_01} from '../src/01/basic'
import {advanced_01} from "../src/01/advanced";

const Benchmarkify = require("benchmarkify");

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day 01").printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day 01");

//add reference
// @ts-ignore
bench.ref("Day 01 - basic", async done => {
  await basic_01(false);
  done();
});

//@ts-ignore
bench.add("Day 01 - advanced", async done => {
  await advanced_01(false);
  done();
});

bench.run();
