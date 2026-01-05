import { ListTypes } from "../../reducers/DailyStateReducer";
import { List } from "../List/List";
import styles from "./Lists.module.scss";

export const Lists = () => {

    return <div className={styles.lists}>
        <List heading="Things to focus on" listType={ListTypes.FOCUS} />
        <List heading="Self-care" listType={ListTypes.SELF_CARE} />
    </div>
}