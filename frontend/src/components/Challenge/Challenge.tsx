import { useContext, useEffect, useState } from "react";
import type { IChallenge } from "../../models/IChallenge";
import { getChallenge } from "../../services/challengeService";
import { MoodContext } from "../../contexts/MoodContext";
import { DailyStateContext } from "../../contexts/DailyStateContext";
import { ActionTypes } from "../../reducers/DailyStateReducer";

export const Challenge = () => {

    const moodContext = useContext(MoodContext);
    const { dispatch, dailyState } = useContext(DailyStateContext);

    if (!moodContext) return null;

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {

            if (!moodContext.mood) return;
            if (dailyState.challenge) return;

            setLoading(true);

            try {
                const data = await getChallenge(moodContext.mood);

                dispatch({
                    type: ActionTypes.CHALLENGE_SET,
                    payload: data
                });

            } catch (error) {
                console.error(error);

            } finally {
                setLoading(false);
            }
            };

            getData();
    }, [moodContext.mood]);

    return (
        <div>
            <h2>Daily challenge</h2>
            <p>{ loading ? "Loading..." : dailyState?.challenge?.text }</p>
        </div>
    );
    };
