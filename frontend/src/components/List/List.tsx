import { useContext } from "react";
import { UpdateListItems } from "../UpdateListItems/UpdateListItems";
import type { ListTypes } from "../../reducers/DailyStateReducer";
import { DailyStateContext } from "../../contexts/DailyStateContext";
import styles from "./List.module.scss";

type ListProps = {
    heading: string,
    listType: ListTypes
}

export const List = (props: ListProps) => {

    const { dailyState } = useContext(DailyStateContext);

    return <div className={styles.list}>
        <h2>{`${props.heading}`}</h2>
        <form onSubmit={(e) => { e.preventDefault() }}>
            <ul>
                {dailyState.lists[props.listType].map((l, i) => 
                    <UpdateListItems key={i} listItem={l} index={i} listType={props.listType}/>
                )}
            </ul>
        </form>
    </div>
}