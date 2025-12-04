import { createContext } from "react";
import type { ITodoContext } from "../models/ITodoContext";

export const TodoContext = createContext<ITodoContext>({
    todos: { focus: [], selfCare: [] },
    dispatch: () => {}
});