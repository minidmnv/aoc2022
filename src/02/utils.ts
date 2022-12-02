const WIN_SCORE = 3;

export const countScoreBasic = (mineShape: string, hisShape: string): number => {
  switch (mineShape) {
    case 'X':
      return 1 + _countScoreAgainst(hisShape, ['A', 'C']);
    case 'Y':
      return 2 + _countScoreAgainst(hisShape, ['B', 'A']);
    case 'Z':
      return 3 + _countScoreAgainst(hisShape, ['C', 'B']);
    default:
      return 0;
  }
}

export const countScoreAdvanced = (wantedResult: string, hisShape: string): number => {
  const possibleResults = ['X', 'Y', 'Z'];
  const possibleShapes = ['A', 'B', 'C'];
  const resultScore = possibleResults.indexOf(wantedResult) * 3;
  switch (wantedResult) {
    case 'X':
      return resultScore + (possibleShapes.indexOf(hisShape) + 2 ) % 3 + 1;
    case 'Y':
      return resultScore + possibleShapes.indexOf(hisShape) + 1;
    case 'Z':
      return resultScore + (possibleShapes.indexOf(hisShape) + 1 ) % 3 + 1;
    default:
      return 0;
  }

}

const _countScoreAgainst = (hisShape: string, scoreArr: string[]) => {
  return scoreArr.includes(hisShape) ? WIN_SCORE + scoreArr.indexOf(hisShape) * WIN_SCORE : 0;
}
