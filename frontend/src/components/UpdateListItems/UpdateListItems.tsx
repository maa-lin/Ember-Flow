import { useContext, useRef, useState } from "react"
import type { List } from "../../models/List"
import { ActionTypes, ListTypes } from "../../reducers/ListReducer"
import { ListContext } from "../../contexts/ListContext"

type UpdateListItemsProps = {
    list: List,
    index: number,
    listType: ListTypes
}

export const UpdateListItems = (props: UpdateListItemsProps) => {

    const { dispatch } = useContext(ListContext);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const inputRef = useRef<HTMLInputElement | null>(null); //Holds an input element from the DOM and gives direct access to it, used to shift focus on inputs.

    const updateListItem = (text: string) => {
        if (!isEditing) return;

        dispatch({
            type: ActionTypes.UPDATED,
            payload: { id: props.list.id, text: text, listType: props.listType}
        });
    };

    const toggleListItem = () => {
        if (isEditing || !props.list.text.trim()) return;

        dispatch({
            type: ActionTypes.TOGGLED,
            payload: { id: props.list.id, listType: props.listType }
        });
    };

    const startEditing = () => {
        setIsEditing(true);
        inputRef.current?.focus();
    };

    const stopEditing = () => {
        setIsEditing(false);
        inputRef.current?.blur();
    };

    const handleOnBlur = () => {
        if (isEditing) stopEditing();
    };

    const handleInputOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (isEditing || !e.currentTarget.value.trim()) {
            startEditing();
        }
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            e.currentTarget.blur();
        }
    };

    return <li onClick={toggleListItem}>

            <label>
                <input 
                    type="checkbox"
                    checked={props.list.isDone}
                    disabled={isEditing || !props.list.text.trim()}
                    onChange={toggleListItem}
                    onClick={(e) => { e.stopPropagation() }}  //Stops onClick on <li> so toggle is not triggered twice.
                 />
                 Mark as done
            </label>

            <label>
                {`${props.listType} item ${props.index + 1}`}
                <input 
                    ref={inputRef}
                    type="text"
                    value={props.list.text} 
                    readOnly={!isEditing}
                    onChange={(e) => { updateListItem(e.target.value) }}
                    onBlur={handleOnBlur}
                    onClick={handleInputOnClick}
                    onKeyDown={handleOnKeyDown}
                />
            </label>

            <button
                type="button"
                onMouseDown={(e) => { // Use onMouseDown instead of onClick so clicking the edit button does NOT trigger input onBlur and exit edit mode before this runs.
                    e.preventDefault(); //Prevents button from stealing focus from text-input.
                    isEditing ? stopEditing() : startEditing(); 
                }}
                onClick={(e) => { e.stopPropagation() }} //Stops the onClick on <li> so that toggle is not triggered when clicking the edit-button
            >
                {isEditing ? "✔️" : "✏️"}
            </button>
    </li>
}