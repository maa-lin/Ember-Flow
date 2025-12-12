import type { Mood } from "../models/IMoodContext";
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
  }
};

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
