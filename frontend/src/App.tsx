import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { ActionTypes, DailyStateReducer } from "./reducers/DailyStateReducer";
import { getDailyStateFromLocalStorage, getMoodFromLocalStorage, saveListsToLocalStorage, saveMoodToLocalStorage } from "./utils/localStorage";
import { ListItem } from "./models/List";
import { checkIfNewDay } from "./utils/checkTimeStamp";
import { router } from "./Router";
import { RouterProvider } from "react-router";
import { MoodContext } from "./contexts/MoodContext";
import type { Mood } from "./models/IMoodContext";
import { DailyStateContext } from "./contexts/DailyStateContext";

function App() {

  const [mood, setMood] = useState<Mood>(getMoodFromLocalStorage());
  console.log(mood);

  const [dailyState, dispatch] = useReducer(DailyStateReducer, getDailyStateFromLocalStorage() || {
        lists: { 
            focus: [ new ListItem(""), new ListItem(""), new ListItem("") ], 
            selfCare: [ new ListItem(""), new ListItem("") ] 
        },
        challenge: null
});

  useEffect(() => {
    saveListsToLocalStorage(dailyState);
  }, [dailyState] );

  useEffect(() => {

    if (checkIfNewDay()) { // Check if daily reset-time has passed (03.00) on app-load.
      dispatch({
        type: ActionTypes.RESET
      });

      setMood(null);
      saveMoodToLocalStorage(null);
    };

    // Also check reset-time when tab becomes visible again, 
    // in case the app stays open for a longer time without reloading.
    const handleVisibility = () => { 
      if (document.visibilityState === "visible") {
        if (checkIfNewDay()) {
          dispatch({
            type: ActionTypes.RESET
          });
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
      <MoodContext.Provider value={{ mood, setMood }}>
        <DailyStateContext.Provider value={{ dailyState, dispatch }}>
          <RouterProvider router={router} />
        </DailyStateContext.Provider>
      </MoodContext.Provider>
    </>
  );
}

export default App;
