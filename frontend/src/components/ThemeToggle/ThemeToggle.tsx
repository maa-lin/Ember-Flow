import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { saveThemeToLocalStorage } from "../../utils/localStorage";
import styles from "./ThemeToggle.module.scss";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

export const ThemeToggle = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const handleOnChange = () => {
        setTheme(theme === "sunrise" ? "sunset" : "sunrise");
        saveThemeToLocalStorage(theme === "sunrise" ? "sunset" : "sunrise");
    };

    return <label className={styles["theme-toggle"]}>
        <input type="checkbox" className="sr-only" onChange={ handleOnChange } checked={theme === "sunrise" ? false : true} />
        <span className={styles["track"]}>
            <span className={styles["knob"]}>{theme === "sunrise" ? <FaSun /> : <FaMoon />}</span>
        </span>
        <span className="sr-only">Change app theme</span>
    </label>
};