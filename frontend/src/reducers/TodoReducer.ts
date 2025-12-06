import { type Todos } from "../models/Todo";

export const ActionTypes = {
    TOGGLED: "TOGGLED",
    UPDATED: "UPDATED",
    RESET: "RESET"
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

export const TodoTypes = {
    FOCUS: "focus",
    SELF_CARE: "selfCare"
} as const;

export type TodoTypes = typeof TodoTypes[keyof typeof TodoTypes];

export type Action = 
    | {
        type: typeof ActionTypes.UPDATED;
        payload: { id: string, text: string, todoType: TodoTypes; }}
    | {
        type: typeof ActionTypes.TOGGLED;
        payload: { id: string, todoType: TodoTypes; }}
    | {
        type: typeof ActionTypes.RESET;
    }

export const TodoReducer = (todos: Todos, action: Action): Todos => {

    switch (action.type) {
        case "UPDATED": {
            return {...todos, [action.payload.todoType]: todos[action.payload.todoType].map((t) => {
                if (t.id === action.payload.id) {
                    return {...t, text: action.payload.text}
                };

                return t;
            })};

        };

        case "TOGGLED": {
            return {...todos, [action.payload.todoType]: todos[action.payload.todoType].map((t) => {
                if (t.id === action.payload.id) {
                    return {...t, isDone: !t.isDone}
                };

                return t;
            })};
        };

        case "RESET": 
            return { 
                focus: todos.focus.map(t => ({ ...t, text: "", isDone: false })),
                selfCare: todos.selfCare.map(t => ({ ...t, text: "", isDone: false })),
        };
            

        default:
            return todos;
    };
}