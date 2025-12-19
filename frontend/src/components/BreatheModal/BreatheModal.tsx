import { CloseButton } from "../CloseButton/CloseButton"
import styles from "./BreatheModal.module.scss"

export const BreatheModal = () => {

    return <div className={styles["breathe-modal"]}>
        <CloseButton />
        <h1 className="sr-only">Breathe</h1>
        <p>Breathe in as the circle grows,<br/>
            breathe out as it softens again.</p>
        <p>Take as much or as little time as you need.</p>
    </div>
}