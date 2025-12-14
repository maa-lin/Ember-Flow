import type { Dispatch } from "react";
import type { Action } from "../reducers/ListReducer";
import type { DailyState } from "./DailyState";

export interface IDailyStateContext {
    dailyState: DailyState;
    dispatch: Dispatch<Action>;
}