import { useEffect, useReducer } from "react";
import "./App.css";
import { ListReducer } from "./reducers/ListReducer";
import { ListContext } from "./contexts/ListContext";
import { Lists } from "./components/Lists/Lists";
import { getListFromLocalStorage, saveListsToLocalStorage } from "./utils/localStorage";
import { ListItem } from "./models/List";

function App() {
  const [lists, dispatch] = useReducer(ListReducer, getListFromLocalStorage() || {
    focus: [new ListItem(""), new ListItem(""), new ListItem("")],
    selfCare: [new ListItem(""), new ListItem("")]
  });

  useEffect(() => {
    saveListsToLocalStorage(lists);
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
