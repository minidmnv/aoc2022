import {basic_01} from "./basic";
import {logResponse} from "../utils/log-utils";

const TASK_DATA = ["01", "Advanced"];
const TASK_LABEL = TASK_DATA.join(" ");

const advanced_01 = async () => {
  const basicResult = await basic_01(false)
  const result = basicResult.slice(0, 3).reduce((acc, val) => acc + val);

  logResponse(TASK_LABEL, result);
};

advanced_01();
