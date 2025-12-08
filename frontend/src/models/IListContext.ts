import type { Dispatch } from "react";
import type { Lists } from "./List";
import type { Action } from "../reducers/ListReducer";

export interface IListContext {
    lists: Lists;
    dispatch: Dispatch<Action>;
}