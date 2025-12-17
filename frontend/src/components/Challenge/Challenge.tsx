import { useContext, useEffect, useState } from "react";
import { getChallenge } from "../../services/challengeService";
import { MoodContext } from "../../contexts/MoodContext";
import { DailyStateContext } from "../../contexts/DailyStateContext";
import { ActionTypes } from "../../reducers/DailyStateReducer";
import styles from "./Challenge.module.scss";
import { AffirmationModal } from "../AffirmationModal/AffirmationModal";
import { getChallengeIsCompletedToLocalStorage, saveChallengeIsCompletedToLocalStorage } from "../../utils/localStorage";
import { FaStar } from "react-icons/fa6";

export const Challenge = () => {
  const moodContext = useContext(MoodContext);
  const { dispatch, dailyState } = useContext(DailyStateContext);

  if (!moodContext) return null;

  const [loading, setLoading] = useState<boolean>(false);
  const [showAffirmation, setShowAffirmation] = useState<boolean>(false);
  const [completedToday, setCompletedToday] = useState<boolean>(getChallengeIsCompletedToLocalStorage());

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

  const handleOnClick = () => {
    setShowAffirmation(true);
    setCompletedToday(true);
    saveChallengeIsCompletedToLocalStorage(true);
  };

  return (
    <div className={styles.challenge}>
      
      <h2><FaStar />Daily Challenge</h2>
      {!completedToday ? (
        <>
          <p>{loading ? "Loading..." : dailyState?.challenge?.text}</p>
          <div className={styles["btn-container"]}>
            <button onClick={handleOnClick}>I did this!</button>
            <button>Skip</button>
          </div>
        </>
      ) : (
        <small>
          You completed today´s challenge. Come back tomorrow for a new one.
        </small>
      ) }
      {showAffirmation && dailyState.challenge && (
        <AffirmationModal
          onClose={() => setShowAffirmation(false)}
          affirmation={dailyState.challenge.affirmation}
        />
      )}

    </div>
  );
};
