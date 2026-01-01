import { useNavigate } from "react-router";
import styles from "./WelcomeModal.module.scss";
import { saveHasSeenWelcomePageToLocalStorage } from "../../utils/localStorage";

export const WelcomeModal = () => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        saveHasSeenWelcomePageToLocalStorage();
        navigate("/mood", { replace: true });
    }

    return <div className={styles.welcome}>
        <h1>Ember Flow</h1>
        <p className="tagline">— Tend your energy, one gentle moment at a time. </p>
         <p>
            This isn't a to-do list.<br />
            It's a place to focus on just a few things — and care for yourself along the way.
         </p>
        <button className="btn btn--primary" onClick={ handleOnClick }>Continue</button>
    </div>
}