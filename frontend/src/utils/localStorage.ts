import type { DailyState } from "../models/DailyState";
import type { Mood } from "../models/IMoodContext";

//Lists and timestamp
export const saveListsToLocalStorage = (dailyState: DailyState) => {
  localStorage.setItem("dailyState", JSON.stringify(dailyState));
  localStorage.setItem("lastUpdated", Date.now().toString());
};

export const getListFromLocalStorage = () => {
  const foundValue = localStorage.getItem("dailyState");

  if (!foundValue) return null;

  try {
    const dailyStateFromLs: DailyState = JSON.parse(foundValue);

    if (!dailyStateFromLs) return null;
    
    if (!dailyStateFromLs.lists.focus || !dailyStateFromLs.lists.selfCare) return null;  
    
    return dailyStateFromLs;
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
  }
};

//Mood
export const saveMoodToLocalStorage = (mood: Mood) => {
    localStorage.setItem("mood", JSON.stringify(mood));
};

export const getMoodFromLocalStorage = () => {
  const foundValue = localStorage.getItem("mood");

  if (!foundValue) return null;

  try {
    const mood: Mood = JSON.parse(foundValue);

    if (
      mood === "calm" ||
      mood === "happy" ||
      mood === "neutral" ||
      mood === "stressed" ||
      mood === null
    ) return mood;

    return null;

  } catch (error) {
    return null;
  }
};
