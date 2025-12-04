import { act } from "react";
import { Todo, type Todos } from "../models/Todo";

type ActionTypes = "ADDED" | "DELETED" | "TOGGLED";

export type Action = {
    type: ActionTypes,
    payload: { textOrId: string, todoType: "focus" | "selfCare" };
};

export const TodoReducer = (todos: Todos, action: Action): Todos => {

    switch (action.type) {
        case "ADDED":{
            return {...todos, [action.payload.todoType]: [...todos[action.payload.todoType], new Todo(action.payload.textOrId)]};
            
        };

        case "DELETED": {
            return {...todos, [action.payload.todoType]: todos[action.payload.todoType].filter((f) => f.id !== action.payload.textOrId)};
        };

        case "TOGGLED": {
            return {...todos, [action.payload.todoType]: todos[action.payload.todoType].map((t) => {
                if (t.id === action.payload.textOrId) {
                    return {...t, isDone: !t.isDone}
                };

                return t;
            })};
        };

        default:
            return todos;
    };
}