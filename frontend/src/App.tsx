import { useEffect, useReducer } from "react";
import "./App.css";
import { ActionTypes, ListReducer } from "./reducers/ListReducer";
import { ListContext } from "./contexts/ListContext";
import { Lists } from "./components/Lists/Lists";
import { getListFromLocalStorage, saveListsToLocalStorage } from "./utils/localStorage";
import { ListItem } from "./models/List";
import { checkIfNewDay } from "./utils/checkTimeStamp";

function App() {
  const [lists, dispatch] = useReducer(ListReducer, getListFromLocalStorage() || {
    focus: [new ListItem(""), new ListItem(""), new ListItem("")],
    selfCare: [new ListItem(""), new ListItem("")]
  });

  useEffect(() => {
    saveListsToLocalStorage(lists);
  }, [lists] );

  useEffect(() => {
    const isNewDay = checkIfNewDay();

    if (isNewDay) { // Check if daily reset-time has passed (03.00) on app-load.
      dispatch({
        type: ActionTypes.RESET
      });
    };

    // Also check reset-time when tab becomes visible again, 
    // in case the app stays open for a longer time without reloading.
    const handleVisibility = () => { 
      if (document.visibilityState === "visible") {
        if (isNewDay) {
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
      <ListContext.Provider value={{ lists, dispatch }}>
        <Lists />
      </ListContext.Provider>
    </>
  );
}

export default App;
