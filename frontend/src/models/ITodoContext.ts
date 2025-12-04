import type { Dispatch } from "react";
import type { Todos } from "./Todo";
import type { Action } from "../reducers/TodoReducer";

export interface ITodoContext {
    todos: Todos;
    dispatch: Dispatch<Action>;
}