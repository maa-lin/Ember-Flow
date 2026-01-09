import { ActionTypes, type Action } from "../reducers/DailyStateReducer";
import { saveChallengeStatusToLocalStorage, saveDailyStateToLocalStorage, saveHasClickedStartTheDayToLocalStorage, saveMoodToLocalStorage } from "./localStorage";
import { ListItem } from "../models/List";
import type React from "react";
import type { Mood } from "../models/IMoodContext";

export const dailyReset = (dispatch: React.Dispatch<Action>, setMood: (mood: Mood) => void) => {
    dispatch({
        type: ActionTypes.RESET
    });
    
    setMood(null);
    saveMoodToLocalStorage(null);
    saveChallengeStatusToLocalStorage("active");
    saveHasClickedStartTheDayToLocalStorage(false);
    saveDailyStateToLocalStorage({
        lists: {
            focus: [new ListItem(""), new ListItem(""), new ListItem("")],
            selfCare: [new ListItem(""), new ListItem("")],
        },
        challenge: null
    });
}