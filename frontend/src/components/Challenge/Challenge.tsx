import { useContext, useEffect, useState } from "react";
import { getChallenge } from "../../services/challengeService";
import { MoodContext } from "../../contexts/MoodContext";
import { DailyStateContext } from "../../contexts/DailyStateContext";
import { ActionTypes } from "../../reducers/DailyStateReducer";
import styles from "./Challenge.module.scss";
import { AffirmationModal } from "../AffirmationModal/AffirmationModal";
import { getChallengeStatusFromLocalStorage, saveChallengeStatusToLocalStorage } from "../../utils/localStorage";
import { MdAutoAwesome } from "react-icons/md";

export type ChallengeStatus = "active" | "completed" | "skipped";

export const Challenge = () => {
  const moodContext = useContext(MoodContext);
  const { dispatch, dailyState } = useContext(DailyStateContext);

  if (!moodContext) return null;

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

  const handleCompleteOnClick = (status: ChallengeStatus) => {
    if (status === "completed") {
      setShowAffirmation(true);
    };
    
    setStatus(status);
    saveChallengeStatusToLocalStorage(status);
  };

  return (
    <div className={styles.challenge}>
      
      <h2><MdAutoAwesome />Daily Challenge</h2>
      {status === "active" && 
        <>
          <p>{loading ? "Loading..." : dailyState?.challenge?.text}</p>
          <div className={styles["btn-container"]}>
            <button onClick={() => handleCompleteOnClick("completed")}>I did this!</button>
            <button onClick={() => handleCompleteOnClick("skipped")}>Skip</button>
          </div>
        </>
      }

      {status === "completed" && <p>
          You completed today’s challenge. A new one will be waiting for you tomorrow.

        </p>
      }

      {status === "skipped" && <p>
          A new challenge will be waiting for you tomorrow.
        </p>
      } 

      {showAffirmation && dailyState.challenge && (
        <AffirmationModal
          onClose={() => setShowAffirmation(false)}
          affirmation={dailyState.challenge.affirmation}
        />
      )}

    </div>
  );
};
