import { useEffect, useReducer } from "react";
import "./App.css";
import { ListReducer } from "./reducers/ListReducer";
import { List } from "./models/List";
import { ListContext } from "./contexts/ListContext";
import { Lists } from "./components/Lists/Lists";
import { getListFromLocalStorage, saveListToLocalStorage } from "./utils/localStorage";

function App() {
  const [lists, dispatch] = useReducer(ListReducer, getListFromLocalStorage() || {
    focus: [new List(""), new List(""), new List("")],
    selfCare: [new List(""), new List("")]
  });

  useEffect(() => {
    saveListToLocalStorage(lists);
  }, [lists] );

  return (
    <>
      <ListContext.Provider value={{ lists, dispatch }}>
        <Lists />
      </ListContext.Provider>
    </>
  );
}

export default App;
