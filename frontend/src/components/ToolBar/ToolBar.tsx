import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router";
import styles from "./ToolBar.module.scss";

export const ToolBar = () => {
    const navigate = useNavigate();

    return <div className={styles["tool-bar"]}>
        <button onClick={() => navigate("/breathe")}>
            <span className={styles["tool-icon"]}><FaLeaf /></span>
            Breathe
        </button>
    </div>
};