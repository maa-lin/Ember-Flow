import { useContext, useEffect, useRef, useState } from "react";
import type { ListItem } from "../../models/List";
import { DailyStateContext } from "../../contexts/DailyStateContext";
import { ActionTypes, type ListTypes } from "../../reducers/DailyStateReducer";
import { GetListAffirmation } from "../GetListAffirmation/GetListAffirmation";
import styles from "./UpdateListItems.module.scss";
import { Checkbox } from "../Checkbox/Checkbox";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";
import { useReward } from "partycles";
import { createPortal } from "react-dom";

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

  // Sparkle burst with Partycles: https://jonathanleane.github.io/partycles/#installation
  const ref = useRef<HTMLDivElement | null>(null);
  const { reward } = useReward(ref as React.RefObject<HTMLDivElement>, "magicdust", {
        particleCount: 35,
        elementSize: 10,
        spread: 500,
        duration: 1200,
        startVelocity: 15,
        colors: ["#f0af4f", "#ffc4a6", "#ffc23e" ]
  });

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

    requestAnimationFrame(() => { // Waits until the element actually exists before triggering animation
        reward();
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

  return (
    <li
      className={styles["list-row"]}
      style={{ 
        "--bg-color": currentTheme.itemBg,
        "--shadow": currentTheme.shadowS
      } as React.CSSProperties}
    >
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={props.listItem.isDone}
          disabled={ isEditing || !props.listItem.text.trim() || props.listItem.isDone }
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
        maxLength={35}
        autoComplete="off"
        id={`${props.listType}${props.index + 1}`}
        value={props.listItem.text}
        className={`
          ${styles["input-item"]} 
          ${ props.listItem.isDone ? styles.checked : "" }
          ${!props.listItem.text.trim() ? styles.empty : ""}
        `}
        disabled={props.listItem.isDone}
        onChange={(e) => { updateListItem(e.target.value); }}
        onFocus={() => { setIsEditing(true); }}
        onBlur={() => { setIsEditing(false); }}
        onClick={() => { setIsEditing(true); }}
        onKeyDown={handleOnKeyDown}
        style={
          {
            "--input-color": currentTheme.primaryTextColor,
            "--checked": currentTheme.disabledText,
          } as React.CSSProperties
        }
      />

      {showAffirmation && createPortal(<div ref={ref} className="sparkles"></div>, document.body)}

      <GetListAffirmation
        isOpen={showAffirmation}
        onClose={() => { setShowAffirmation(false); }}
        listType={props.listType}
      />
    </li>
  );
};
