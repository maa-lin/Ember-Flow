import { useContext, useState } from "react";
import { MoodContext } from "../../contexts/MoodContext";
import type { Mood } from "../../models/IMoodContext";
import { saveMoodToLocalStorage } from "../../utils/localStorage";
import styles from "./MoodCheck.module.scss";
import {
  FaFaceLaughBeam,
  FaFaceMeh,
  FaFaceSmile,
  FaFaceTired,
} from "react-icons/fa6";
import { useNavigate } from "react-router";

export const MoodCheck = () => {
  const moodContext = useContext(MoodContext);
  const navigate = useNavigate();

  if (!moodContext) return null;

  const handleClick = (mood: Mood) => {
    moodContext.setMood(mood);
    saveMoodToLocalStorage(mood);
  };

  console.log(moodContext.mood);

  return (
    <div className={styles["mood-check"]}>
      <h1>How are you feeling today?</h1>
      <p>Take a moment to check in with yourself.</p>
      <ul>
        <li>
          <button onClick={() => handleClick("happy")}>
            <FaFaceLaughBeam className={`${styles["mood-icon"]} ${moodContext.mood === "happy" ? styles.selected : ""}`} />
            Happy
          </button>
        </li>
        <li>
          <button onClick={() => handleClick("calm")}>
            <FaFaceSmile className={`${styles["mood-icon"]} ${moodContext.mood === "calm" ? styles.selected : ""}`} />
            Calm
          </button>
        </li>
        <li>
          <button onClick={() => handleClick("neutral")}>
            <FaFaceMeh className={`${styles["mood-icon"]} ${moodContext.mood === "neutral" ? styles.selected : ""}`} />
            Neutral
          </button>
        </li>
        <li>
          <button onClick={() => handleClick("stressed")}>
            <FaFaceTired className={`${styles["mood-icon"]} ${moodContext.mood === "stressed" ? styles.selected : ""}`} />
            Stressed
          </button>
        </li>
      </ul>

      <button
        className="btn"
        disabled={!moodContext.mood}
        onClick={() => navigate("/", { replace: true })}
      >
        Start your day
      </button>
    </div>
  );
};
