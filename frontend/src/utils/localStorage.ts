import type { Lists } from "../models/List";

export const saveListToLocalStorage = (list: Lists) => {
    localStorage.setItem("lists", JSON.stringify(list));
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