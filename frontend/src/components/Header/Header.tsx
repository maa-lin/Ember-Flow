import { NavLink } from "react-router";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import { FaQuestion } from "react-icons/fa6";

export const Header = () => {
    
    return <header className={styles.header}>
        <ThemeToggle />
        <nav>
            <span className={styles.help}>
                <NavLink to={"/help"}><FaQuestion className={styles.icon} /></NavLink>
            </span>
        </nav>
    </header>
};