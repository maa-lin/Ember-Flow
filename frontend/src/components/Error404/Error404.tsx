import { NavLink } from "react-router"
import styles from "./Error404.module.scss"

export const Error404 = () => {

    return <div className={styles.error}>
        <h1>Error 404</h1>
        <p>The page you were looking for does not exist.</p>
        <NavLink to={"/"}>Back to home</NavLink>
    </div>
}