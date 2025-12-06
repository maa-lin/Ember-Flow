import { createContext } from "react";
import type { ITodoContext } from "../models/ITodoContext";
import { Todo } from "../models/Todo";

export const TodoContext = createContext<ITodoContext>({
    todos: { 
        focus: [ new Todo(""), new Todo(""), new Todo("") ], 
        selfCare: [ new Todo(""), new Todo("") ] },
    dispatch: () => {}
});