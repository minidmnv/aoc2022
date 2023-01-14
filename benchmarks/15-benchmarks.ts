import {readFile} from '../src/utils/file-utils';
import {FileSeparator} from '../src/utils/file-separator';
import {advanced15} from "../src/15/advanced";
import {basic15} from "../src/15/basic";

const DAY = '15';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Benchmarkify = require('benchmarkify');
const input = readFile(DAY, FileSeparator.LINE, true);

const benchmark = new Benchmarkify('Advent of Code 2022 (TS) - Day ' + DAY).printHeader();

// Create a test suite
const bench = benchmark.createSuite('Day ' + DAY);

// add reference
// @ts-expect-error
bench.ref(`Day ${DAY} - basic`, async done => {
  await basic15(input, false);
  done();
});

// @ts-expect-error
bench.add(`Day ${DAY} - advanced`, async done => {
  await advanced15(input, false);
  done();
});

bench.run();
