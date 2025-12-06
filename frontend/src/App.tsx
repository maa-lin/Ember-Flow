import { useReducer } from "react";
import "./App.css";
import { TodoContext } from "./contexts/TodosContext";
import { TodoReducer } from "./reducers/TodoReducer";
import { Todos } from "./components/Todos/Todos";
import { Todo } from "./models/Todo";

function App() {
  const [todos, dispatch] = useReducer(TodoReducer, {  
    focus: [ new Todo( ""), new Todo( ""), new Todo( "") ], 
    selfCare: [ new Todo( ""), new Todo( "") ] });

  return (
    <>
      <TodoContext.Provider value={{ todos, dispatch }}>
        <Todos />
      </TodoContext.Provider>
    </>
  );
}

export default App;
