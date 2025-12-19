import { FaXmark } from "react-icons/fa6"
import { NavLink } from "react-router"
import styles from "./CloseButton.module.scss"

export const CloseButton = () => {
    return <NavLink to={"/"} className={styles.close}><FaXmark className={styles.xmark} /></NavLink>
}