import type { Lists } from "../models/List";

export const saveListsToLocalStorage = (lists: Lists) => {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("lastUpdated", Date.now().toString());
};

export const getListFromLocalStorage = () => {
    const foundValue = localStorage.getItem("lists");

    if (!foundValue) return null;

    try {
        const listsFromLs: Lists = JSON.parse(foundValue);
    
        if (!listsFromLs.focus || !listsFromLs.selfCare) return null;
    
        return listsFromLs;
    
    } catch {
        return null;
    }
};

export const getTimeStampFromLocalStorage = () => {
    const foundValue = localStorage.getItem("lastUpdated");

    if (foundValue) {
        const timeStamp = +foundValue;

        return timeStamp;
    } else {
        return null;
    };
};