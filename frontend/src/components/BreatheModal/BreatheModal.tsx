import { useContext } from "react";
import { BreathingAnimation } from "../BreathingAnimation/BreathingAnimation";
import { CloseButton } from "../CloseButton/CloseButton";
import styles from "./BreatheModal.module.scss";
import { MoodContext } from "../../contexts/MoodContext";
import { Navigate } from "react-router";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";

export const BreatheModal = () => {
  const moodContext = useContext(MoodContext);

  if (!moodContext) {
    return <Navigate to={"/mood"} replace />;
  }

  const { theme } = useContext(ThemeContext);
  const currentTheme = themes[theme];

  return (
    <div className={styles.overlay}>
      <div
        className={styles["breathe-modal"]}
        style={{ backgroundColor: currentTheme.modalBgColor }}
      >
        <CloseButton />
        <h1 className="sr-only">Breathe</h1>
        <p>
          Breathe in as the circle grows,
          <br />
          breathe out as it softens again.
        </p>
        <p>Take as much or as little time as you need.</p>
        <BreathingAnimation />
      </div>
    </div>
  );
};
