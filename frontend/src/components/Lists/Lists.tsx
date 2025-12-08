import { ListTypes } from "../../reducers/ListReducer";
import { List } from "../List/List";

export const Lists = () => {

    return <>
        <List heading="Things to focus on" listType={ListTypes.FOCUS} />
        <List heading="Self-care" listType={ListTypes.SELF_CARE} />
    </>
}