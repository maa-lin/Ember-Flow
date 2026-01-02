import { FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router";
import styles from "./CloseButton.module.scss";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";

export const CloseButton = () => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = themes[theme];

  return (
    <NavLink to={"/"} className={styles.close}>
      <FaXmark 
        style={{ "--x-mark": currentTheme.primaryTextColor } as React.CSSProperties}
        className={styles.xmark} />
    </NavLink>
  );
};
