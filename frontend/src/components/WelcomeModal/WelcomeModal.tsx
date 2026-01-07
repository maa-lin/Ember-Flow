import { useNavigate } from "react-router";
import styles from "./WelcomeModal.module.scss";
import { saveHasSeenWelcomePageToLocalStorage } from "../../utils/localStorage";

export const WelcomeModal = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    saveHasSeenWelcomePageToLocalStorage();
    navigate("/mood", { replace: true });
  };

  return (
    <div className={styles.welcome}>
      <h1>Ember Flow</h1>
      <p className="tagline">
        — Tend your energy, one gentle moment at a time.
      </p>
      <p>
        This isn’t a traditional to-do list.
        <br />
        It helps you focus on less, not more.
      </p>
      <p>
        It’s a place to choose a few things to focus on — and care for yourself
        along the way.
      </p>
      <button className="btn btn--primary" onClick={handleOnClick}>
        Continue
      </button>
    </div>
  );
};
