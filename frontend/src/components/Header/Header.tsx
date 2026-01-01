import { NavLink } from "react-router";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import { FaQuestion } from "react-icons/fa6";

export const Header = () => {
    
    return <header className={styles.header}>
        <ThemeToggle />
        <nav>
            <NavLink to={"/help"} className={styles["help-icon"]}><FaQuestion className={styles.icon} /></NavLink>
        </nav>
    </header>
};