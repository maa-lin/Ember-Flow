import type { DailyState } from "../models/DailyState";
import { ListItem, type Lists } from "../models/List";

export const ActionTypes = {
  TOGGLED: "TOGGLED",
  UPDATED: "UPDATED",
  RESET: "RESET",
  CHALLENGE_SET: "CHALLENGE_SET",
} as const;

export type ActionTypes = (typeof ActionTypes)[keyof typeof ActionTypes];

export const ListTypes = {
  FOCUS: "focus",
  SELF_CARE: "selfCare",
} as const;

export type ListTypes = (typeof ListTypes)[keyof typeof ListTypes];

export type Action =
  | {
      type: typeof ActionTypes.UPDATED;
      payload: { id: string; text: string; listType: ListTypes };
    }
  | {
      type: typeof ActionTypes.TOGGLED;
      payload: { id: string; listType: ListTypes };
    }
  | {
      type: typeof ActionTypes.CHALLENGE_SET;
      payload: {};
    }
  | {
      type: typeof ActionTypes.RESET;
    };

export const DailyStateReducer = (dailyState: DailyState, action: Action): DailyState => {

  switch (action.type) {
    case "UPDATED": {
      return { ...dailyState, lists: {...dailyState.lists, [action.payload.listType]: dailyState.lists[action.payload.listType].map((t) => {
                if (t.id === action.payload.id) {
                    return { ...t, text: action.payload.text };
                }

                return t;
          })
        }
      };
    }

    case "TOGGLED": {
      return {...dailyState, lists: { ...dailyState.lists, [action.payload.listType]: dailyState.lists[action.payload.listType].map((t) => {
                if (t.id === action.payload.id) {
                    return { ...t, isDone: !t.isDone };
                }

                 return t;
            })
        }
      };
    }

    case "CHALLENGE_SET": {
    }

    case "RESET":
      return {
        lists: {
            focus: [new ListItem(""), new ListItem(""), new ListItem("")],
            selfCare: [new ListItem(""), new ListItem("")],
        },
        challenge: null
      };

    default:
      return dailyState;
  }
};
