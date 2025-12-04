import { useReducer, useState } from "react";
import "./App.css";
import { TodoContext } from "./contexts/TodosContext";
import { TodoReducer } from "./reducers/TodoReducer";

function App() {
  const [todos, dispatch] = useReducer(TodoReducer, { focus: [], selfCare: [] });

  return (
    <>
      <TodoContext.Provider value={{ todos, dispatch }}>

      </TodoContext.Provider>
    </>
  );
}

export default App;
