import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router";
import styles from "./ToolBar.module.scss";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";

export const ToolBar = () => {
    const { theme } = useContext(ThemeContext);
    const currentTheme = themes[theme];

    const navigate = useNavigate();

    return <div className={styles["tool-bar"]}>
        <button 
            style={{ "--breathe-btn": currentTheme.primaryTextColor } as React.CSSProperties}
            onClick={() => navigate("/breathe")}>
            <span className={styles["tool-icon"]}><FaLeaf /></span>
            Breathe
        </button>
    </div>
};