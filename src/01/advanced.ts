import {basic_01} from "./basic";
import {logResponse} from "../utils/log-utils";

const TASK_DATA = ["01", "Advanced"];
const TASK_LABEL = TASK_DATA.join(" ");

export const advanced_01 = async (logIt: boolean) => {
  const basicResult = await basic_01(false)
  const result = basicResult.slice(0, 3).reduce((acc, val) => acc + val);

  logIt && logResponse(TASK_LABEL, result);
};
