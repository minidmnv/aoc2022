import {basic_01} from "./basic";
import {logResponse} from "../utils/log-utils";

const advanced_01 = async () => {
  const basicResult = await basic_01(false)
  const result = basicResult.slice(0, 3).reduce((acc, val) => acc + val);

  logResponse("01 Advanced", result);
};

advanced_01();
