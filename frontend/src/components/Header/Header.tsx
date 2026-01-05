import { NavLink } from "react-router";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import { FaQuestion } from "react-icons/fa6";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = themes[theme];

  return (
    <header className={styles.header}>
      <ThemeToggle />
      <nav>
        <NavLink
          to={"/help"}
          style={
            {
              "--help-icon-color": currentTheme.primaryTextColor,
              "--help-icon-color-bg": currentTheme.helpIconBg,
              "--help-shadow": currentTheme.shadowS
            } as React.CSSProperties
          }
        >
          <FaQuestion className={styles.icon} />
        </NavLink>
      </nav>
    </header>
  );
};
