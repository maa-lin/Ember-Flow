import { useContext, useState } from "react"
import { TodoContext } from "../../contexts/TodosContext"
import { ActionTypes, TodoTypes } from "../../reducers/TodoReducer";

export const FocusList = () => {

    const { todos, dispatch } = useContext(TodoContext);

    const updateTodo = (id: string, text: string, todoType: TodoTypes) => {
        dispatch({
            type: ActionTypes.UPDATED,
            payload: { id: id, text: text, todoType: todoType}
        });
    };

    return <div className="focus">
        <h2>Things to focus on</h2>
        <form onSubmit={(e) => { e.preventDefault() }}>
            <ul>
                {todos.focus.map((t, i) => 
                    <li key={i+1}>
                        <label htmlFor={`focus${i+1}`} className="sr-only">
                            {`Focus item ${i+1}`}
                            <input type="text" id={`focus${i+1}`} name={`focus${i+1}`} value={t.text} onChange={
                                (e) => { updateTodo(t.id, e.target.value, TodoTypes.FOCUS)}
                            } />
                        </label>
                    </li>
                )}
            </ul>
        </form>
    </div>
}