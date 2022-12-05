import {basic_02} from "../src/02/basic";
import {advanced_02} from "../src/02/advanced";

const Benchmarkify = require("benchmarkify");

const benchmark = new Benchmarkify("Advent of Code 2022 (TS) - Day 02").printHeader();

// Create a test suite
const bench = benchmark.createSuite("Day 02");

//add reference
// @ts-ignore
bench.ref("Day 02 - basic", async done => {
  await basic_02(false);
  done();
});

//@ts-ignore
bench.add("Day 02 - advanced", async done => {
  await advanced_02(false);
  done();
});

bench.run();
