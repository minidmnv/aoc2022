# 🧑‍🎄 Advent of Code :two::zero::two::two: (Typescript) 🧑‍🎄

Repository to keep solutions for Advent of Code 2022 edition. this time I decided to take it in Typescript.

## [Advent of Code 2022](https://adventofcode.com/) 🧑‍🎄

Santa's reindeer typically eat regular reindeer food, but they need a lot of magical energy to deliver presents on Christmas. For that, their favorite snack is a special type of star fruit that only grows deep in the jungle. The Elves have brought you on their annual expedition to the grove where the fruit grows.

To supply enough magical energy, the expedition needs to retrieve a minimum of fifty :star:s by December 25th. Although the Elves assure you that the grove has plenty of fruit, you decide to grab any fruit you see along the way, just in case.

Collect :star:s by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one :star:. Good luck!

## 🎄 Results 🎄

:star::star:
:star::star:
:star::star:
:star::star:
:star::star:
:star::star:
:star::star:
:star::star:
:star::star:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:
:white_flower::white_flower:

![preview](https://github.com/minidmnv/aoc2022/blob/master/assets/results/results.png?raw=true)

### Tasks :white_check_mark:

- [Day 1: Calorie Counting](https://github.com/minidmnv/aoc2022/blob/master/src/01) ⌛
- [Day 2: Rock Paper Scissors](https://github.com/minidmnv/aoc2022/blob/master/src/02) ⌛
- [Day 3: Rucksack Reorganization](https://github.com/minidmnv/aoc2022/blob/master/src/03) ⌛
- [Day 4: Camp Cleanup](https://github.com/minidmnv/aoc2022/blob/master/src/04) ⌛
- [Day 5: Supply Stacks](https://github.com/minidmnv/aoc2022/blob/master/src/05) ⌛
- [Day 6: Tuning Trouble](https://github.com/minidmnv/aoc2022/blob/master/src/06) ⌛
- [Day 7: No Space Left On Device](https://github.com/minidmnv/aoc2022/blob/master/src/07) ⌛
- [Day 8: Treetop Tree House](https://github.com/minidmnv/aoc2022/blob/master/src/08) ⌛
- [Day 9: Rope Bridge](https://github.com/minidmnv/aoc2022/blob/master/src/09) ⌛
- ⏳

| Task   | Execution time                | Result            | Complexity (1-3) |
|--------|-------------------------------|-------------------|------------------|
| Day 01 | (4,737 rps) / (4,998 rps)     | :star: / :star:   | :one:  / :one:   |
| Day 02 | (2,174 rps) / (2,155 rps)     | :star: / :star:   | :one:  / :one:   |
| Day 03 | (3,831 rps) / (1,639 rps)     | :star: / :star:   | :one:  / :one:   |
| Day 04 | (2,083 rps) / (2,065 rps)     | :star: / :star:   | :one:  / :one:   |
| Day 05 | (6,087 rps) / (5,574 rps)     | :star: / :star:   | :one:  / :one:   |
| Day 06 | (15,840 rps) / (858 rps)      | :star: / :star:   | :one:  / :one:   |
| Day 07 | (5,033 rps) / (4,422 rps)     | :star: / :star:   | :one:  / :one:   |
| Day 08 | Need to be optimized ;)       | :star: / :star:   | :one:  / :two:   |
| Day 09 | (618 rps) / (412 rps) as well | :star: / :star:   | :two:  / :two:   |

## 🛠 Usage 🛠

### Use correct node version :recycle:
>nvm use

### Install dependencies :moneybag:
> npm install

### Run :rocket:

Run scripts are named by days they are bound to:

To run Day 01 scripts and log their responses, just type:
> npm run 01
 
### Tests :customs:

To run tests:
> npm run test

### Benchmarks :bar_chart:

Benchmarks are also in package.json, tu run benchmark, just use number of day with -benchmark after, for example:
> npm run 4-benchmark

Very often advanced scripts are using basic scripts to not repeat myself, so You can get multiple results.

## 📂 Structure 📂
- Tasks are grouped in directories with number of day and in files named by complexity, 
so day 1 will be directory 01 with two files underneath basic.ts and advanced.ts
- There will be also input.txt file in each directory
- Utils scripts will be placed in utils directory
- Benchmarks for everyday solutions together (basic + advanced)

* 📘 **src/${day} or utils** - implementations
* 📔 **assets** - various images, mainly
* 📗 **src/\_\_tests\_\_** - tests for tasks
*  📖 **benchmarks** - tasks benchmarks, one suite can have multiple benchmarks when there is more implementations for one task provided

## 🧙 Wants more? 🧙

Check out my colleagues repositories, who are also taking part in this year AoC.
- [Contes](https://github.com/mateusz-bryll/AdventOfCode2022) (C#)


## 🧑‍🍳 Author 🧑‍🍳
Authored completely by Michal "Lidjan" Nicinski @minidmnv
