import type { ChallengeStatus } from "../components/Challenge/Challenge";
import type { DailyState } from "../models/DailyState";
import type { Mood } from "../models/IMoodContext";
import type { ThemeKey } from "../models/Theme";

//DailyState and timestamp
export const saveDailyStateToLocalStorage = (dailyState: DailyState) => {
  localStorage.setItem("dailyState", JSON.stringify(dailyState));
  localStorage.setItem("lastUpdated", Date.now().toString());
};

export const getDailyStateFromLocalStorage = () => {
  const foundValue = localStorage.getItem("dailyState");

  if (!foundValue) return null;

  try {
    const dailyStateFromLs = JSON.parse(foundValue);

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
    const mood = JSON.parse(foundValue);

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

// Theme 
export const saveThemeToLocalStorage = (theme: ThemeKey) => {
  localStorage.setItem("theme", JSON.stringify(theme));
};

export const getThemeFromLocalStorage = () => {
  const foundValue = localStorage.getItem("theme");

  if (!foundValue) return null;

  try {
    const theme = JSON.parse(foundValue);

    if (theme === "sunrise" || theme === "sunset") return theme;

    return null;
    
  } catch (error) {
    return null;
  }
};

//Challenge
export const saveChallengeStatusToLocalStorage = (status: ChallengeStatus) => {
  localStorage.setItem("challengeStatus", JSON.stringify(status));
};

export const getChallengeStatusFromLocalStorage = () => {
  const foundValue = localStorage.getItem("challengeStatus");

  if (!foundValue) return "active";

  try {
    const status = JSON.parse(foundValue);

    if (status === "active" || status === "completed" || status === "skipped") return status;

    return "active";

  } catch (error) {
    return "active";
  }
}

// Welcome-page
export const saveHasSeenWelcomePageToLocalStorage = () => {
  localStorage.setItem("hasSeenWelcome", JSON.stringify(true));
};

export const getHasSeenWelcomePageFromLocalStorage = () => {
  const foundValue = localStorage.getItem("hasSeenWelcome");

  if (foundValue) {
    const hasSeen = JSON.parse(foundValue);

    return hasSeen;
  };

  return null;
}
