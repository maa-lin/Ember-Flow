import { useReducer } from "react";
import "./App.css";
import { ListReducer } from "./reducers/ListReducer"
import { List } from "./models/List";
import { ListContext } from "./contexts/ListContext";
import { Lists } from "./components/Lists/Lists";

function App() {
  const [lists, dispatch] = useReducer(ListReducer, {  
    focus: [ new List( ""), new List( ""), new List( "") ], 
    selfCare: [ new List( ""), new List( "") ] });

  return (
    <>
      <ListContext.Provider value={{ lists, dispatch }}>
        <Lists />
      </ListContext.Provider>
    </>
  );
}

export default App;
