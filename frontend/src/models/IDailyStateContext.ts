import type { Dispatch } from "react";
import type { Action } from "../reducers/DailyStateReducer";
import type { DailyState } from "./DailyState";

export interface IDailyStateContext {
    dailyState: DailyState;
    dispatch: Dispatch<Action>;
}