import { useContext } from "react";
import { UpdateListItems } from "../UpdateListItems/UpdateListItems";
import { ListContext } from "../../contexts/ListContext";
import type { ListTypes } from "../../reducers/ListReducer";

type ListProps = {
    heading: string,
    listType: ListTypes
}

export const List = (props: ListProps) => {

    const { lists } = useContext(ListContext);

    return <div className={`${props.listType}`}>
        <h2>{`${props.heading}`}</h2>
        <form onSubmit={(e) => { e.preventDefault() }}>
            <ul>
                {lists[props.listType].map((l, i) => 
                    <UpdateListItems key={i} listItem={l} index={i} listType={props.listType}/>
                )}
            </ul>
        </form>
    </div>
}