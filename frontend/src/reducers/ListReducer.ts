import { type List, type Lists } from "../models/List";

export const ActionTypes = {
    TOGGLED: "TOGGLED",
    UPDATED: "UPDATED",
    RESET: "RESET"
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

export const ListTypes = {
    FOCUS: "focus",
    SELF_CARE: "selfCare"
} as const;

export type ListTypes = typeof ListTypes[keyof typeof ListTypes];

export type Action = 
    | {
        type: typeof ActionTypes.UPDATED;
        payload: { id: string, text: string, listType: ListTypes; }}
    | {
        type: typeof ActionTypes.TOGGLED;
        payload: { id: string, listType: ListTypes; }}
    | {
        type: typeof ActionTypes.RESET;
    }

export const ListReducer = (lists: Lists, action: Action): Lists => {

    switch (action.type) {
        case "UPDATED": {
            return {...lists, [action.payload.listType]: lists[action.payload.listType].map((t) => {
                if (t.id === action.payload.id) {
                    return {...t, text: action.payload.text}
                };

                return t;
            })};

        };

        case "TOGGLED": {
            return {...lists, [action.payload.listType]: lists[action.payload.listType].map((t) => {
                if (t.id === action.payload.id) {
                    return {...t, isDone: !t.isDone}
                };

                return t;
            })};
        };

        case "RESET": 
            return { 
                focus: lists.focus.map(t => ({ ...t, text: "", isDone: false })),
                selfCare: lists.selfCare.map(t => ({ ...t, text: "", isDone: false })),
        };
            

        default:
            return lists;
    };
}