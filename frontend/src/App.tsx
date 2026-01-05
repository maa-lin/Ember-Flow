import { useEffect, useReducer, useState } from "react";
import { DailyStateReducer } from "./reducers/DailyStateReducer";
import { getDailyStateFromLocalStorage, getMoodFromLocalStorage, getThemeFromLocalStorage, saveDailyStateToLocalStorage } from "./utils/localStorage";
import { ListItem } from "./models/List";
import { checkIfNewDay } from "./utils/checkTimeStamp";
import { router } from "./Router";
import { RouterProvider } from "react-router";
import { MoodContext } from "./contexts/MoodContext";
import type { Mood } from "./models/IMoodContext";
import { DailyStateContext } from "./contexts/DailyStateContext";
import { ThemeContext } from "./contexts/ThemeContext";
import { themes, type ThemeKey } from "./models/Theme";
import { dailyReset } from "./utils/dailyReset";

function App() {

  const [mood, setMood] = useState<Mood>(getMoodFromLocalStorage());

  const [theme, setTheme] = useState<ThemeKey>(getThemeFromLocalStorage() || "sunrise");
  const currentTheme = themes[theme];

  const [dailyState, dispatch] = useReducer(DailyStateReducer, getDailyStateFromLocalStorage() || {
        lists: { 
            focus: [ new ListItem(""), new ListItem(""), new ListItem("") ], 
            selfCare: [ new ListItem(""), new ListItem("") ] 
        },
        challenge: null
  });

  useEffect(() => {
    document.body.className = currentTheme.theme;
  }, [theme] );

  useEffect(() => {
    if (checkIfNewDay()) return;
    saveDailyStateToLocalStorage(dailyState);
  }, [dailyState] );

  useEffect(() => {
    if (checkIfNewDay()) { // Check if daily reset-time has passed (03.00) on app-load.
      dailyReset(dispatch, setMood);
    };

    // Also check reset-time when tab becomes visible again, 
    // in case the app stays open for a longer time without reloading.
    const handleVisibility = () => { 
      if (document.visibilityState === "visible") {
        if (checkIfNewDay()) {
          dailyReset(dispatch, setMood);
        };
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // The listener must be removed on unmount, otherwise it stays attached and we get
    // multiple listners. 
    // return () => {} is a cleanup function.
    return () => { document.removeEventListener("visibilitychange", handleVisibility) };
  }, []);

  return (
    <>
    <ThemeContext.Provider value={{theme, setTheme}}>
      <MoodContext.Provider value={{ mood, setMood }}>
        <DailyStateContext.Provider value={{ dailyState, dispatch }}>
          <RouterProvider router={router} />
        </DailyStateContext.Provider>
      </MoodContext.Provider>
    </ThemeContext.Provider>
    </>
  );
}

export default App;
