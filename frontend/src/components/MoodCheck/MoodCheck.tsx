import { useContext } from "react";
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
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";

export const MoodCheck = () => {
  const moodContext = useContext(MoodContext);
  const { theme } = useContext(ThemeContext);
  const currentTheme = themes[theme];

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
          <button
            style={{ color: currentTheme.primaryTextColor }}
            onClick={() => handleClick("happy")}
          >
            <FaFaceLaughBeam
              style={{
                "--mood-icon-color": currentTheme.secondaryTextColor,
                opacity:
                  moodContext.mood === "happy" ? 1 : currentTheme.opacity,
              } as React.CSSProperties}
              className={`${styles["mood-icon"]}`}
            />
            Happy
          </button>
        </li>
        <li>
          <button
            style={{ color: currentTheme.primaryTextColor }}
            onClick={() => handleClick("calm")}
          >
            <FaFaceSmile
               style={{
                "--mood-icon-color": currentTheme.secondaryTextColor,
                opacity:
                  moodContext.mood === "calm" ? 1 : currentTheme.opacity,
              } as React.CSSProperties}
              className={`${styles["mood-icon"]}`}
            />
            Calm
          </button>
        </li>
        <li>
          <button
            style={{ color: currentTheme.primaryTextColor }}
            onClick={() => handleClick("neutral")}
          >
            <FaFaceMeh
               style={{
                "--mood-icon-color": currentTheme.secondaryTextColor,
                opacity:
                  moodContext.mood === "neutral" ? 1 : currentTheme.opacity,
              } as React.CSSProperties}
              className={`${styles["mood-icon"]}`}
            />
            Neutral
          </button>
        </li>
        <li>
          <button
            style={{ color: currentTheme.primaryTextColor }}
            onClick={() => handleClick("stressed")}
          >
            <FaFaceTired
               style={{
                "--mood-icon-color": currentTheme.secondaryTextColor,
                opacity:
                  moodContext.mood === "stressed" ? 1 : currentTheme.opacity,
              } as React.CSSProperties}
              className={`${styles["mood-icon"]}`}
            />
            Stressed
          </button>
        </li>
      </ul>

      <button
        className="btn btn--primary"
        disabled={!moodContext.mood}
        onClick={() => navigate("/", { replace: true })}
      >
        Start your day
      </button>
    </div>
  );
};
