import { useContext } from "react"
import { BreathingAnimation } from "../BreathingAnimation/BreathingAnimation"
import { CloseButton } from "../CloseButton/CloseButton"
import styles from "./BreatheModal.module.scss"
import { MoodContext } from "../../contexts/MoodContext"
import { Navigate } from "react-router"

export const BreatheModal = () => {

    const moodContext = useContext(MoodContext);

    if (!moodContext) {
        <Navigate to={"/mood"} replace />
    }

    return <div className={styles["breathe-modal"]}>
        <CloseButton />
        <h1 className="sr-only">Breathe</h1>
        <p>Breathe in as the circle grows,<br/>
            breathe out as it softens again.</p>
        <p>Take as much or as little time as you need.</p>
        <BreathingAnimation />
    </div>
}