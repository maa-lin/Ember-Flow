import { useContext } from "react";
import { MoodContext } from "../../contexts/MoodContext";
import type { Mood } from "../../models/IMoodContext";
import { saveHasClickedStartTheDayToLocalStorage, saveMoodToLocalStorage } from "../../utils/localStorage";
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
                "--mood-icon-color": currentTheme.secondaryTextColor
              } as React.CSSProperties}
              className={`${styles["mood-icon"]} ${moodContext.mood === "happy" ? styles.selected : "" }`}
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
                "--mood-icon-color": currentTheme.secondaryTextColor
              } as React.CSSProperties}
              className={`${styles["mood-icon"]} ${moodContext.mood === "calm" ? styles.selected : "" }`}
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
                "--mood-icon-color": currentTheme.secondaryTextColor
              } as React.CSSProperties}
              className={`${styles["mood-icon"]} ${moodContext.mood === "neutral" ? styles.selected : "" }`}
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
                "--mood-icon-color": currentTheme.secondaryTextColor
              } as React.CSSProperties}
              className={`${styles["mood-icon"]} ${moodContext.mood === "stressed" ? styles.selected : "" }`}
            />
            Stressed
          </button>
        </li>
      </ul>

      <button
        className="btn btn--primary"
        disabled={!moodContext.mood}
        onClick={() => {
          navigate("/", { replace: true })
          saveHasClickedStartTheDayToLocalStorage(true);
        }}
      >
        Start your day
      </button>
    </div>
  );
};
