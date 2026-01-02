import { useContext, useEffect, useState } from "react";
import type { ListItem } from "../../models/List";
import { DailyStateContext } from "../../contexts/DailyStateContext";
import { ActionTypes, type ListTypes } from "../../reducers/DailyStateReducer";
import { GetListAffirmation } from "../GetListAffirmation/GetListAffirmation";
import styles from "./UpdateListItems.module.scss";
import { Checkbox } from "../Checkbox/Checkbox";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";

type UpdateListItemsProps = {
  listItem: ListItem;
  index: number;
  listType: ListTypes;
};

export const UpdateListItems = (props: UpdateListItemsProps) => {
  const { dispatch } = useContext(DailyStateContext);
  const { theme } = useContext(ThemeContext);
  const currentTheme = themes[theme];

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showAffirmation, setShowAffirmation] = useState<boolean>(false);

  useEffect(() => {
    if (showAffirmation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showAffirmation]);

  const updateListItem = (text: string) => {
    if (!isEditing) return;

    dispatch({
      type: ActionTypes.UPDATED,
      payload: { id: props.listItem.id, text: text, listType: props.listType },
    });
  };

  const toggleListItem = () => {
    if (isEditing || !props.listItem.text.trim()) return;

    dispatch({
      type: ActionTypes.TOGGLED,
      payload: { id: props.listItem.id, listType: props.listType },
    });

    if (!props.listItem.isDone) {
      setShowAffirmation(true);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      e.currentTarget.blur();
    }
  };
  console.log(props.listItem.isDone);

  return (
    <li
      className={styles["list-row"]}
      style={{ "--bg-color": currentTheme.itemBg } as React.CSSProperties}
    >
      <label>
        <input
          type="checkbox"
          checked={props.listItem.isDone}
          disabled={
            isEditing || !props.listItem.text.trim() || props.listItem.isDone
          }
          onChange={toggleListItem}
          className="sr-only"
        />

        <Checkbox isDone={props.listItem.isDone} />

        <span className="sr-only">Mark as done</span>
      </label>

      <label
        htmlFor={`${props.listType}${props.index + 1}`}
        className="sr-only"
      >
        {`${props.listType} item ${props.index + 1}`}
      </label>

      <input
        type="text"
        id={`${props.listType}${props.index + 1}`}
        value={props.listItem.text}
        className={`${styles["input-item"]} ${
          props.listItem.isDone ? styles.checked : ""
        }`}
        disabled={props.listItem.isDone}
        onChange={(e) => {
          updateListItem(e.target.value);
        }}
        onBlur={() => {
          setIsEditing(false);
        }}
        onClick={() => {
          setIsEditing(true);
        }}
        onKeyDown={handleOnKeyDown}
        style={
          {
            "--input-color": currentTheme.primaryTextColor,
            "--checked": currentTheme.disabledText,
          } as React.CSSProperties
        }
      />

      <GetListAffirmation
        isOpen={showAffirmation}
        onClose={() => {
          setShowAffirmation(false);
        }}
        listType={props.listType}
      />
    </li>
  );
};
