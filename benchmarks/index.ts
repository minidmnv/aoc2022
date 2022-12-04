import { basic_01 } from '../src/01/basic'
import { advanced_01 } from '../src/01/advanced'
import { basic_02 } from '../src/02/basic'

const Benchmarkify = require("benchmarkify");
const benchmarkToRun: number = +process.argv[2];
const benchmarks = [];
benchmarks.push(null);

const benchmark = new Benchmarkify("Advent of Code 2022 (TS)").printHeader();

// Create a test suite
const bench1 = benchmark.createSuite("Day 01");

//add reference
// @ts-ignore
bench1.ref("Day 01 - basic", async done => {
  await basic_01(false);
  done();
});

// @ts-ignore
// bench1.add("Day 01 - advanced", async done => {
//   await advanced_01();
//   done();
// });

benchmarks.push(bench1);

// Create a test suite
const bench2 = benchmark.createSuite("Day 02");

//add reference
// @ts-ignore
bench2.ref("Day 02 - basic", async done => {
  await basic_02(false);
  done();
});

benchmarks.push(bench2);

benchmarks[benchmarkToRun].run();
