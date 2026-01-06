import { useContext, useEffect, useRef, useState } from "react";
import { getChallenge } from "../../services/challengeService";
import { MoodContext } from "../../contexts/MoodContext";
import { DailyStateContext } from "../../contexts/DailyStateContext";
import { ActionTypes } from "../../reducers/DailyStateReducer";
import styles from "./Challenge.module.scss";
import { AffirmationModal } from "../AffirmationModal/AffirmationModal";
import { getChallengeStatusFromLocalStorage, saveChallengeStatusToLocalStorage } from "../../utils/localStorage";
import { MdAutoAwesome } from "react-icons/md";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";
import { useReward } from "partycles";
import { createPortal } from "react-dom";

export type ChallengeStatus = "active" | "completed" | "skipped";

export const Challenge = () => {
  const moodContext = useContext(MoodContext);
  const { dispatch, dailyState } = useContext(DailyStateContext);

  if (!moodContext) return null;

  const { theme } = useContext(ThemeContext);
  const currentTheme = themes[theme];
  
  // Sparkle burst with Partycles: https://jonathanleane.github.io/partycles/#installation
  const ref = useRef<HTMLDivElement | null>(null);
  const { reward } = useReward(ref as React.RefObject<HTMLDivElement>, "magicdust", {
        particleCount: 35,
        elementSize: 10,
        spread: 500,
        duration: 1200,
        startVelocity: 10,
        colors: ["#f0af4f", "#ffc4a6", "#ffc23e" ]
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showAffirmation, setShowAffirmation] = useState<boolean>(false);
  const [status, setStatus] = useState<ChallengeStatus>(getChallengeStatusFromLocalStorage());

  useEffect(() => {
    if (showAffirmation) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
  }, [showAffirmation] );
    
  useEffect(() => {
    const getData = async () => {
      if (!moodContext.mood) return;
      if (dailyState.challenge) return;

      setLoading(true);

      try {
        const data = await getChallenge(moodContext.mood);

        dispatch({
          type: ActionTypes.CHALLENGE_SET,
          payload: data,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [moodContext.mood]);

  const handleOnClick = (status: ChallengeStatus) => {
    if (status === "completed") {
      setShowAffirmation(true);

      requestAnimationFrame(() => { // Waits until the element actually exists before triggering animation
        reward();
      });
    };
    
    setStatus(status);
    saveChallengeStatusToLocalStorage(status);
  };

  return (
    <div style={
      { 
        "--bg-color": currentTheme.itemBg,
        "--box-shadow": currentTheme.shadowS
     } as React.CSSProperties} className={styles.challenge}>
      
      <h2><MdAutoAwesome />Daily Challenge</h2>

      {status === "active" && 
        <>
          <p>{loading ? "Loading..." : dailyState?.challenge?.text}</p>
          <div className={styles["btn-container"]}>
            <button
              style={{ "--link-color": currentTheme.linkColor } as React.CSSProperties} 
              onClick={() => handleOnClick("completed")}
            >
              I did this!
            </button>
            <button 
              style={{ "--link-color": currentTheme.linkColor } as React.CSSProperties} 
              onClick={() => handleOnClick("skipped")}
            >
              Skip
            </button>
          </div>
        </>
      }

      {status === "completed" && 
        <p>
          You completed today’s challenge. A new one will be waiting for you tomorrow.
        </p>
      }

      {status === "skipped" && 
        <p>
          A new challenge will be waiting for you tomorrow.
        </p>
      } 

{showAffirmation && createPortal(<div ref={ref} className="sparkles"></div>, document.body)}

      {showAffirmation && dailyState.challenge && (
        <AffirmationModal
          onClose={() => setShowAffirmation(false)}
          affirmation={dailyState.challenge.affirmation}
        />
      )}
    </div>
  );
};
