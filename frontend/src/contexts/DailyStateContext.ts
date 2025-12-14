import { createContext } from "react";
import type { IDailyStateContext } from "../models/IDailyStateContext";
import { ListItem } from "../models/List";

export const DailyStateContext = createContext<IDailyStateContext>({
    dailyState: {
        lists: { 
            focus: [ new ListItem(""), new ListItem(""), new ListItem("") ], 
            selfCare: [ new ListItem(""), new ListItem("") ] 
        },
        challenge: null
    },
    dispatch: () => {}
});