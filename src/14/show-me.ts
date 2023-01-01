import { CaveModel } from './types';
import { getCaveDeepLevel } from './utils';

export const showMe = (cave: CaveModel): void => {
  const xAxis = [...cave.keys()].sort((x1, x2) => x1 - x2);
  const yAxis = Array.from({ length: getCaveDeepLevel(cave) }, (_, i) => i);
  let result = '';
  yAxis.forEach(y => {
    let yAxisString = '';
    xAxis.forEach(x => {
      yAxisString += cave.get(x)?.find((caveModelPoint) => caveModelPoint.stringCoords() === `${x},${y}`)?.value.toString() ?? '.';
    });

    result += yAxisString + '\n';
  });

  console.log(result);
};
