import { createContext } from "react";
import type { IListContext } from "../models/IListContext";
import { ListItem } from "../models/List";

export const ListContext = createContext<IListContext>({
    lists: { 
        focus: [ new ListItem(""), new ListItem(""), new ListItem("") ], 
        selfCare: [ new ListItem(""), new ListItem("") ] },
    dispatch: () => {}
});