import { createContext } from "react";
import type { IListContext } from "../models/IListContext";
import { List } from "../models/List";

export const ListContext = createContext<IListContext>({
    lists: { 
        focus: [ new List(""), new List(""), new List("") ], 
        selfCare: [ new List(""), new List("") ] },
    dispatch: () => {}
});